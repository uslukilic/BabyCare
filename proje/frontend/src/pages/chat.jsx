import { useState } from "react";
import api from "../api/axios";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);
      const response = await api.post("/chat", { question });
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "bot", text: response.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        userMessage,
        {
          role: "bot",
          text: "Üzgünüm, chat bot şu anda cevap veremiyor. Lütfen biraz sonra tekrar deneyin.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const quickQuestions = [
    "Bebek beslenmesi hakkında bilgi",
    "Uyku rutini önerisi",
    "Hastalık ve ateş durumunda ne yapmalıyım",
  ];

  const sendQuickQuestion = async (question) => {
    setInput(question);
    await sendMessage(question);
  };

  return (
    <div className="min-h-screen bg-[#F7ECF3] py-16">
      <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-semibold mb-6">Canlı Destek</h1>
        <p className="text-gray-600 mb-8">
          Hemen soru yazabilir veya hazır konulardan birini seçebilirsiniz.
        </p>
      <div className="border rounded-3xl p-6 bg-white shadow-sm space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "bot"
                ? "text-left bg-gray-100 rounded-2xl p-4"
                : "text-right bg-primary-50 rounded-2xl p-4"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {quickQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => sendQuickQuestion(question)}
              className="rounded-full border border-primary-600 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
            >
              {question}
            </button>
          ))}
        </div>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sorunuzu yazın..."
          className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white rounded-full px-6 py-3 hover:bg-primary-700"
            disabled={loading}
        >
            {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
      </div>
    </div>
  );
}