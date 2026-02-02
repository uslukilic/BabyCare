import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Survey() {
  const [survey, setSurvey] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    api
      .get("/survey/active")
      .then((res) => setSurvey(res.data))
      .catch(() => setSurvey(null));
  }, []);

  const vote = async (optionId) => {
    try {
      await api.post(`/survey/vote/${optionId}`);
      setVoted(true);
    } catch {
      alert("Zaten oy verdiniz");
    }
  };

  if (!survey) {
    return (
      <section className="w-full bg-white py-32">
        <p className="text-center text-gray-500 text-lg">
          Aktif anket bulunmamaktadır.
        </p>
      </section>
    );
  }

  return (
    <>
      {/* ===== ÜST BAŞLIK ===== */}
      <section className="w-full bg-[#F7ECF3] py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
            Anket
          </h1>
          <p className="text-gray-600 text-lg">
            Görüşleriniz hizmetlerimizi geliştirmemize yardımcı olur.
          </p>
        </div>
      </section>

      {/* ===== ANKET ===== */}
      <section className="w-full bg-white py-32">
        <div className="max-w-xl mx-auto px-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">
              {survey.question}
            </h2>

            <div className="space-y-4">
              {survey.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => vote(option.id)}
                  disabled={voted}
                  className={`w-full px-6 py-4 rounded-lg border text-left transition
                    ${
                      voted
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 hover:border-pink-500 hover:bg-pink-50"
                    }
                  `}
                >
                  {option.text}
                </button>
              ))}
            </div>

            {voted && (
              <p className="text-center text-green-600 mt-8 font-medium">
                Oyunuz başarıyla alındı 👍
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
