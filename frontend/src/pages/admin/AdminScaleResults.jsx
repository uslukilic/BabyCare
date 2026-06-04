import { useEffect, useState } from "react";
import api from "../../api/axios";

const SCALES = [
  { id: "postpartum", name: "Postpartum Fiziksel Semptom" },
  { id: "vas", name: "VAS - Ağrı Ölçeği" },
  { id: "edinburgh", name: "Edinburgh Depresyon Ölçeği" },
  { id: "breastfeeding", name: "Emzirme Öz-Yeterlilik" },
  { id: "sexual", name: "Cinsel Yaşam Kalitesi" }
];

export default function AdminScaleResults() {
  const [selectedScale, setSelectedScale] = useState(SCALES[0].id);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResults();
  }, [selectedScale]);

  const loadResults = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/survey/scale-results/${selectedScale}`);
      setResults(res.data);
    } catch (error) {
      console.error("Sonuçlar yüklenemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  const scaleName = SCALES.find((s) => s.id === selectedScale)?.name;

  return (
    <div className="space-y-8">
      {/* Başlık */}
      <h1 className="text-2xl font-semibold text-gray-900">Sağlık Ölçekleri Sonuçları</h1>

      {/* Ölçek Seçimi */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Ölçeği Seçin</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCALES.map((scale) => (
            <button
              key={scale.id}
              onClick={() => setSelectedScale(scale.id)}
              className={`p-4 rounded-lg border-2 transition font-medium text-left ${
                selectedScale === scale.id
                  ? "border-pink-600 bg-pink-50 text-pink-900"
                  : "border-gray-200 bg-white text-gray-900 hover:border-pink-300"
              }`}
            >
              {scale.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sonuçlar Tablosu */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-8 py-6 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">{scaleName} - Yanıtlar</h2>
          <p className="text-sm text-gray-600 mt-1">
            Toplam {results.length} kullanıcı bu ölçeği doldurmuş
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">Bu ölçek için henüz sonuç yok</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700 text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Kullanıcı Adı</th>
                  <th className="px-6 py-3 text-left">Tarih</th>
                  <th className="px-6 py-3 text-left">Yanıtlar</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{result.id}</td>
                    <td className="px-6 py-4">{result.userName}</td>
                    <td className="px-6 py-4">
                      {new Date(result.createdAt).toLocaleString("tr-TR")}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          const responses = JSON.parse(result.responses);
                          alert(
                            `Yanıtlar: \n${JSON.stringify(responses, null, 2)}`
                          );
                        }}
                        className="text-pink-600 hover:underline font-medium"
                      >
                        Göster
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* İstatistikler */}
      {results.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İstatistikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-600 text-sm">Toplam Yanıt</p>
              <p className="text-2xl font-semibold text-blue-900">{results.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-gray-600 text-sm">Son Yanıt Tarihi</p>
              <p className="text-lg font-semibold text-green-900">
                {new Date(results[0].createdAt).toLocaleString("tr-TR")}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-gray-600 text-sm">Ölçek</p>
              <p className="text-lg font-semibold text-purple-900">{scaleName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
