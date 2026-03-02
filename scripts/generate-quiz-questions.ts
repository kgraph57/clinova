import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "courses");

const client = new Anthropic();

interface QuizQuestion {
  readonly question: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
}

async function generateQuiz(
  lessonContent: string,
  lessonTitle: string,
): Promise<QuizQuestion[]> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `以下のレッスン内容に基づいて、理解度チェック用のクイズを3問作成してください。

レッスン: ${lessonTitle}

内容:
${lessonContent.slice(0, 3000)}

以下のJSON形式で出力してください（JSONのみ、他のテキストなし）:
[
  {
    "question": "質問文",
    "options": ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
    "correctIndex": 0,
    "explanation": "正解の解説"
  }
]`,
      },
    ],
  });

  const text =
    response.content[0]?.type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Failed to parse quiz JSON from response");
  }
  return JSON.parse(jsonMatch[0]) as QuizQuestion[];
}

function formatQuizMDX(questions: QuizQuestion[]): string {
  const quizData = questions.map((q) => ({
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }));

  return `\n\n<Quiz questions={${JSON.stringify(quizData, null, 2)}} />\n`;
}

async function main() {
  const courseId = process.argv[2];
  if (!courseId) {
    console.log("Usage: tsx scripts/generate-quiz-questions.ts <courseId>");
    console.log("\nAvailable courses:");
    const courses = fs
      .readdirSync(CONTENT_DIR)
      .filter((d) =>
        fs.statSync(path.join(CONTENT_DIR, d)).isDirectory(),
      );
    for (const c of courses) {
      console.log(`  - ${c}`);
    }
    process.exit(1);
  }

  const coursePath = path.join(CONTENT_DIR, courseId);
  if (!fs.existsSync(coursePath)) {
    console.error(`Course not found: ${courseId}`);
    process.exit(1);
  }

  const lessons = fs
    .readdirSync(coursePath)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const dryRun = process.argv.includes("--dry-run");

  for (const lessonFile of lessons) {
    const filePath = path.join(coursePath, lessonFile);
    const raw = fs.readFileSync(filePath, "utf-8");

    if (raw.includes("<Quiz")) {
      console.log(`  SKIP ${lessonFile} (already has quiz)`);
      continue;
    }

    const { data, content } = matter(raw);
    console.log(`  Generating quiz for: ${data.title || lessonFile}`);

    try {
      const questions = await generateQuiz(content, data.title || lessonFile);
      const quizMDX = formatQuizMDX(questions);

      if (dryRun) {
        console.log(`    Would append:\n${quizMDX}`);
      } else {
        fs.appendFileSync(filePath, quizMDX);
        console.log(`    Added ${questions.length} questions`);
      }
    } catch (e) {
      console.error(
        `    Failed: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  console.log("\nDone!");
}

main();
