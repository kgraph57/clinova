import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const REQUIRED_FIELDS = ["title", "description", "category", "contentType", "tags", "publishedAt"];
const VALID_CONTENT_TYPES = ["prompt", "tip", "guide", "article", "news"];
const VALID_CATEGORIES = ["diagnosis", "research", "clinical", "ai-fundamentals", "workflow"];
const CONTENT_DIRS = ["prompts", "tips", "guides", "articles", "news"];

interface ValidationError {
  readonly file: string;
  readonly errors: readonly string[];
}

function validateFile(filePath: string): readonly string[] {
  const errors: string[] = [];

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    for (const field of REQUIRED_FIELDS) {
      if (!data[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    if (data.contentType && !VALID_CONTENT_TYPES.includes(data.contentType)) {
      errors.push(`Invalid contentType: ${data.contentType}`);
    }

    if (data.category && !VALID_CATEGORIES.includes(data.category)) {
      errors.push(`Invalid category: ${data.category}`);
    }

    if (data.tags && !Array.isArray(data.tags)) {
      errors.push("tags must be an array");
    }

    if (data.publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt)) {
      errors.push(`Invalid date format: ${data.publishedAt} (expected YYYY-MM-DD)`);
    }
  } catch (e) {
    errors.push(`Failed to parse: ${e instanceof Error ? e.message : String(e)}`);
  }

  return errors;
}

function main() {
  const results: ValidationError[] = [];
  let totalFiles = 0;

  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      totalFiles++;
      const filePath = path.join(dirPath, file);
      const errors = validateFile(filePath);
      if (errors.length > 0) {
        results.push({ file: `${dir}/${file}`, errors });
      }
    }
  }

  console.log(`Validated ${totalFiles} files\n`);

  if (results.length === 0) {
    console.log("All files valid!");
    process.exit(0);
  }

  console.log(`Found issues in ${results.length} files:\n`);
  for (const r of results) {
    console.log(`  ${r.file}:`);
    for (const e of r.errors) {
      console.log(`    - ${e}`);
    }
    console.log();
  }
  process.exit(1);
}

main();
