"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { getQuizResult, saveQuizResult, type QuizResult } from "@/lib/storage";
import { fadeInUp } from "@/lib/animations";

export interface QuizQuestion {
  readonly question: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
}

interface QuizProps {
  readonly questions: readonly QuizQuestion[];
  readonly courseId?: string;
  readonly lessonSlug?: string;
}

export function Quiz({ questions = [], courseId, lessonSlug }: QuizProps) {
  const [selected, setSelected] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [previousResult, setPreviousResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!courseId || !lessonSlug) return;
    const saved = getQuizResult(courseId, lessonSlug);
    if (saved) {
      setPreviousResult(saved);
      setSelected([...saved.answers]);
      setSubmitted(true);
    }
  }, [courseId, lessonSlug]);

  if (questions.length === 0) return null;

  const score = submitted
    ? questions.reduce(
        (acc, q, i) => acc + (selected[i] === q.correctIndex ? 1 : 0),
        0,
      )
    : 0;

  const allAnswered = selected.every((s) => s !== null);

  const handleSelect = useCallback(
    (qIndex: number, optIndex: number) => {
      if (submitted) return;
      setSelected((prev) => {
        const next = [...prev];
        next[qIndex] = optIndex;
        return next;
      });
    },
    [submitted],
  );

  const handleSubmit = useCallback(() => {
    if (!allAnswered) return;
    setSubmitted(true);

    const result: QuizResult = {
      answers: selected as number[],
      score: questions.reduce(
        (acc, q, i) => acc + (selected[i] === q.correctIndex ? 1 : 0),
        0,
      ),
      total: questions.length,
      completedAt: Date.now(),
    };

    if (courseId && lessonSlug) {
      saveQuizResult(courseId, lessonSlug, result);
    }
  }, [allAnswered, selected, questions, courseId, lessonSlug]);

  const handleRetry = useCallback(() => {
    setSelected(questions.map(() => null));
    setSubmitted(false);
    setPreviousResult(null);
  }, [questions]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-10 rounded-2xl border bg-muted/30 p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-sm font-semibold tracking-wide">セルフチェック</h3>
      </div>

      <div className="space-y-8">
        {questions.map((q, qIdx) => {
          const isCorrect = selected[qIdx] === q.correctIndex;
          return (
            <div key={qIdx}>
              <p className="mb-3 text-sm font-medium leading-relaxed">
                {qIdx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selected[qIdx] === oIdx;
                  const showCorrect = submitted && oIdx === q.correctIndex;
                  const showWrong =
                    submitted && isSelected && oIdx !== q.correctIndex;

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        !submitted &&
                          isSelected &&
                          "border-foreground bg-muted",
                        !submitted && !isSelected && "hover:bg-muted/50",
                        showCorrect &&
                          "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
                        showWrong &&
                          "border-red-400 bg-red-50 dark:bg-red-950/20",
                        submitted && !showCorrect && !showWrong && "opacity-50",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                          isSelected &&
                            !submitted &&
                            "border-foreground bg-foreground text-background",
                          showCorrect &&
                            "border-emerald-500 bg-emerald-500 text-white",
                          showWrong && "border-red-400 bg-red-400 text-white",
                        )}
                      >
                        {showCorrect && <CheckCircle2 className="h-3 w-3" />}
                        {showWrong && <XCircle className="h-3 w-3" />}
                        {!submitted && String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div
                      className={cn(
                        "rounded-lg px-4 py-3 text-xs leading-relaxed",
                        isCorrect
                          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300"
                          : "bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-300",
                      )}
                    >
                      {isCorrect ? "正解！" : "不正解。"} {q.explanation}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-4">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-40"
          >
            回答する
          </button>
        ) : (
          <>
            <div className="text-sm font-medium">
              {score}/{questions.length} 正解
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              やり直す
            </button>
          </>
        )}
      </div>

      {previousResult && submitted && (
        <p className="mt-3 text-xs text-muted-foreground">
          前回:{" "}
          {new Date(previousResult.completedAt).toLocaleDateString("ja-JP")} に{" "}
          {previousResult.score}/{previousResult.total} 正解
        </p>
      )}
    </motion.div>
  );
}
