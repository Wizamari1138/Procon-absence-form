// app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const today = new Date();
  const formattedTodayDate = today.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
    day: "2-digit"}).replaceAll('/', '-')
  const [date, setDate] = useState<string>(formattedTodayDate);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify({ name, reason, date }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">欠席連絡フォーム</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mt-1 text-white bg-gray-800 border-white placeholder-white/70"
          placeholder="名前を入力"
          required
        />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded mt-1 text-white bg-gray-800 border-white placeholder-white/70"
          placeholder="理由を入力"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded mt-1 text-white bg-gray-800 border-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          送信
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
