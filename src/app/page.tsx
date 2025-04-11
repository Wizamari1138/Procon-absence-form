"use client";
import { useState } from "react";

export default function AbsenceForm() {
  const [name, setName] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const today = new Date();
  const formattedTodayDate = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
    day: "2-digit"}).replaceAll('/', '-')
  const [date, setDate] = useState<string>(formattedTodayDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, reason, date }),
    });

    if (res.ok) {
      alert("メールが送信されました");
      setName("");
      setReason("");
      setDate("");
    } else {
      alert("送信に失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">欠席連絡フォーム</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <label className="block mb-2 text-gray-900 font-semibold">
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <label className="block mb-2 text-gray-900 font-semibold">
          欠席理由:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <label className="block mb-4 text-gray-900 font-semibold">
          欠席日:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          送信
        </button>
      </form>
    </div>
  );
}
