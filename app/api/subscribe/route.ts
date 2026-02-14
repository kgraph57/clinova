import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const subscribeSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

function getSubscribers(): string[] {
  try {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) return [];
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveSubscribers(subscribers: string[]) {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    const subscribers = getSubscribers();

    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 409 },
      );
    }

    const updated = [...subscribers, email];
    saveSubscribers(updated);

    return NextResponse.json({ message: "登録完了" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 },
    );
  }
}
