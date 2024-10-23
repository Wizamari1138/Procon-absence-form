import React, { useState } from 'react';

function App() {
  // フォームデータの状態管理
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // フォーム入力のハンドラ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // フォーム送信のハンドラ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // 送信中の状態に設定
    setErrorMessage(''); // エラーメッセージをリセット

    try {
      // APIにデータを送信
      const response = await fetch('https://procon-absence-form-server.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }

      const data = await response.json();
      console.log('サーバーの応答:', data);

      alert('欠席連絡が送信されました！');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('送信エラー:', error);
    } finally {
      setIsSubmitting(false); // 送信完了または失敗後に解除
    }
  };

  return (
    <div className="App">
      <h1>プログラミング技術部 欠席連絡フォーム</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>日付:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>理由:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '送信'}
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>エラー: {errorMessage}</p>}
    </div>
  );
}

export default App;
