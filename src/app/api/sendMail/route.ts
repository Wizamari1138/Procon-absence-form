import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, reason, date, grade } = await req.json();

  try {
    const { error } = await resend.emails.send({
      from: "欠席連絡フォーム <onboarding@resend.dev>", // sandbox用送信元
      to: [process.env.OWNER_EMAIL ?? ""],
      subject: "【欠席連絡】",
      text: `学年: ${grade}\n名前: ${name}\n理由: ${reason}\n日付: ${date}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ message: "送信しました！" }, { status: 200 });
  } catch (e) {
    console.error("送信エラー:", e);
    return NextResponse.json({ error: "送信エラーが発生しました" }, { status: 500 });
  }
}
