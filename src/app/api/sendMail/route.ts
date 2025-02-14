import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, reason, date } = await req.json();

  // Gmail の設定
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.OWNER_EMAIL, // 受信者（オーナーのメール）
    subject: "【欠席連絡】" + name,
    text: `名前: ${name}\n欠席日: ${date}\n理由: ${reason}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "メール送信成功" }, { status: 200 });
  } catch (error) {
    console.error("メール送信失敗", error);
    return NextResponse.json({ message: "メール送信失敗" }, { status: 500 });
  }
}
