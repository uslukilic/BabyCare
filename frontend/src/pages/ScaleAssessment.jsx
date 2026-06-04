import { useState } from "react";
import api from "../api/axios";

const SCALES = [
  {
    id: "postpartum",
    name: "Postpartum Fiziksel Semptom Şiddeti Ölçeği",
    description: "Son 1 ay içinde yaşadığınız fiziksel semptomları değerlendirin",
    questions: [
      "Sezaryen bölgesi veya perinede ağrı",
      "Yetersiz uyku kalitesi veya uykusuzluk",
      "Kabızlık",
      "Sırt ağrısı",
      "Baş ağrısı",
      "Hemoroid",
      "Eklem ağrısı",
      "Ellerde uyuşma",
      "Aşırı vajinal akıntı",
      "Vajinal enfeksiyon",
      "Ayaklarda uyuşma",
      "Aşırı vajinal kanama",
      "İdrar yolu enfeksiyonu",
      "Baş dönmesi",
      "Bacaklarda varis",
      "İdrar kaçırma",
      "Normalden daha fazla üşüme",
      "Eller ve/veya ayaklarda üşüme"
    ],
    options: [
      { value: 0, label: "Semptom Yok" },
      { value: 1, label: "Hafif Şiddette" },
      { value: 2, label: "Orta Şiddette" },
      { value: 3, label: "Yüksek Şiddette" }
    ]
  },
  {
    id: "vas",
    name: "Ağrıya İlişkin Görsel Kıyaslama Ölçeği (VAS)",
    description: "Günümüzde hissettiğiniz ağrı şiddetini 0-10 arasında değerlendirin",
    questions: ["Günümüzde ağrı şiddetiniz nedir?"],
    options: Array.from({ length: 11 }, (_, i) => ({ value: i, label: `${i}` })),
    type: "slider"
  },
  {
    id: "edinburgh",
    name: "Edinburgh Doğum Sonrası Depresyon Ölçeği (EDSDÖ)",
    description: "Son 7 gündeki ruh halinizi değerlendirin",
    questions: [
      "Gülebiliyor ve olayların komik taraflarını görebiliyorum",
      "Geleceğe hevesle bakıyorum",
      "Bir şeyler kötü gittiğinde gereksiz yere kendimi suçluyorum",
      "Nedensiz yere kendimi sıkıntılı ya da endişeli hissediyorum",
      "İyi bir neden olmadığı halde korkuyor ya da panikliyorum",
      "Her şey giderek sırtıma yükleniyor",
      "Öylesine mutsuzum ki uyumakta zorlanıyorum",
      "Kendimi üzüntülü ya da çökkün hissediyorum",
      "Öylesine mutsuzum ki ağlıyorum",
      "Kendime zarar verme düşüncesinin aklıma geldiği oldu"
    ],
    options: [
      { value: 3, label: "Evet, çoğu zaman" },
      { value: 2, label: "Evet, bazen" },
      { value: 1, label: "Çok sık değil / Evet, pek o kadar değil" },
      { value: 0, label: "Hayır, hiçbir zaman / Artık hiç değil" }
    ]
  },
  {
    id: "breastfeeding",
    name: "Emzirme Öz-Yeterlilik Kısa Form Ölçeği",
    description: "Emzirme konusunda kendinize ne kadar güvendiğinizi değerlendirin",
    questions: [
      "Bebeğimin yeterli süt alıp almadığını her zaman anlayabilirim",
      "Diğer işlerde olduğu gibi emzirmede de her zaman başarılı olabilirim",
      "Bebeğimi ek olarak mama vermeden her zaman emzirebilirim",
      "Emzirme boyunca bebeğimin memeyi uygun bir şekilde kavramasını her zaman sağlayabilirim",
      "Emzirmeyi her zaman beni memnun edecek şekilde yürütebilirim",
      "Ağlasa bile bebeğimi her zaman emzirebilirim",
      "Emzirme konusunda her zaman istekliyim",
      "Ailemin yanında her zaman bebeğimi rahatlıkla emzirebilirim",
      "Emzirmekten her zaman memnuniyet duyuyorum",
      "Emzirmenin zaman alıcı olması benim açımdan hiçbir zaman sorun olmaz",
      "Diğer memeye geçmeden önce bebeğimi ilk verdiğim memeden ayırabilirim",
      "Her öğünde bebeğimi anne sütüyle besleyebilirim",
      "Bebeğimin emme isteğini her zaman anlayabilirim",
      "Bebeğimin emmeyi bitirmek istediğini her zaman anlayabilirim"
    ],
    options: [
      { value: 1, label: "Hiç Emin Değilim" },
      { value: 2, label: "Çok emin değilim" },
      { value: 3, label: "Bazen Eminim" },
      { value: 4, label: "Eminim" },
      { value: 5, label: "Çok Eminim" }
    ]
  },
  {
    id: "sexual",
    name: "Cinsel Yaşam Kalitesi Ölçeği",
    description: "Son 1 ay içindeki cinsel yaşamınızı değerlendirin",
    questions: [
      "Cinsel yaşamımı düşündüğümde, hayatımın eğlenceli/zevkli bir parçası olduğunu düşünüyorum",
      "Cinsel yaşamımı düşündüğümde, hayal kırıklığı hissediyorum",
      "Cinsel yaşamımı düşündüğümde, kendimi üzgün (depresif) hissediyorum",
      "Cinsel yaşamımı düşündüğümde, kendimi bir kadın olarak eksik hissediyorum",
      "Cinsel yaşamımı düşündüğümde, kendimi iyi hissediyorum",
      "Cinsel bir eş olarak kendime güvenimi yitirdim",
      "Cinsel yaşamımı düşündüğümde, sıkıntı hissediyorum",
      "Cinsel yaşamımı düşündüğümde, kızgınlık hissediyorum",
      "Cinsel yaşamımı düşündüğümde, eşime yakın olduğumu hissediyorum",
      "Cinsel yaşamımın geleceği hakkında endişeleniyorum",
      "Cinsel ilişkiden zevk almıyorum",
      "Cinsel yaşamımı düşündüğümde, utanıyorum",
      "Cinsel konularla ilgili eşimle konuşabileceğimi düşünüyorum",
      "Cinsel ilişkiden kaçınıyorum",
      "Cinsel yaşamımı düşündüğümde, suçluluk hissediyorum",
      "Cinsel yaşamımı düşündüğümde, eşimin rencide olmuş ya da reddedilmiş hissetmesinden endişeleniyorum",
      "Cinsel yaşamımı düşündüğümde, bir şeyleri kaybetmiş gibi hissediyorum",
      "Cinsel yaşamımı düşündüğümde, cinsel ilişki sıklığından memnunum"
    ],
    options: [
      { value: 6, label: "Tamamen katılıyorum" },
      { value: 5, label: "Büyük ölçüde katılıyorum" },
      { value: 4, label: "Kısmen katılıyorum" },
      { value: 3, label: "Kısmen katılmıyorum" },
      { value: 2, label: "Büyük ölçüde katılmıyorum" },
      { value: 1, label: "Hiç katılmıyorum" }
    ]
  }
];

export default function ScaleAssessment() {
  const [selectedScale, setSelectedScale] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScaleSelect = (scaleId) => {
    setSelectedScale(scaleId);
    setCurrentQuestion(0);
    setResponses({});
    setSubmitted(false);
  };

  const handleAnswer = (value) => {
    setResponses({
      ...responses,
      [currentQuestion]: value
    });

    // Bir sonraki soruya geç
    if (currentQuestion < scale.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentQuestion < scale.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/survey/scale-response", {
        scaleId: selectedScale,
        responses: responses,
        timestamp: new Date()
      });
      setSubmitted(true);
    } catch (error) {
      alert("Yanıtlar kaydedilemedi. Lütfen tekrar deneyin.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedScale(null);
    setCurrentQuestion(0);
    setResponses({});
    setSubmitted(false);
  };

  if (!selectedScale) {
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Sağlık Ölçekleri
          </h1>
          <p className="text-gray-600 mb-12">
            Doğum sonrası sağlığınız hakkında daha iyi anlamak için aşağıdaki ölçeklerden birini seçin
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCALES.map((scale) => (
              <button
                key={scale.id}
                onClick={() => handleScaleSelect(scale.id)}
                className="text-left p-6 border border-gray-200 rounded-xl hover:border-pink-600 hover:shadow-lg transition group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 mb-2">
                  {scale.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{scale.description}</p>
                <div className="text-pink-600 font-medium text-sm">
                  {scale.questions.length} soru →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const scale = SCALES.find((s) => s.id === selectedScale);
  const totalQuestions = scale.questions.length;
  const answered = Object.keys(responses).length;
  const progress = (answered / totalQuestions) * 100;

  if (submitted) {
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-xl p-12">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold text-green-900 mb-3">
              Teşekkürler!
            </h2>
            <p className="text-green-800 mb-8">
              {scale.name} başarıyla tamamlandı ve kaydedildi.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Başka Bir Ölçek Seç
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-2xl mx-auto px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleReset}
            className="text-pink-600 hover:text-pink-700 font-medium text-sm mb-4"
          >
            ← Ölçeklere Geri Dön
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {scale.name}
          </h2>
          <p className="text-gray-600 mb-4">{scale.description}</p>

          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Soru {currentQuestion + 1} / {totalQuestions}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {scale.questions[currentQuestion]}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {scale.type === "slider" ? (
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-gray-600">Ağrı Yok</span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={responses[currentQuestion] ?? 5}
                  onChange={(e) => handleAnswer(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(responses[currentQuestion] ?? 5) * 10}%, #e5e7eb ${(responses[currentQuestion] ?? 5) * 10}%, #e5e7eb 100%)`
                  }}
                />
                <span className="text-sm font-medium text-gray-600">
                  Dayanılmaz Ağrı
                </span>
              </div>
            ) : (
              scale.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 border-2 rounded-lg transition ${
                    responses[currentQuestion] === option.value
                      ? "border-pink-600 bg-pink-50 text-pink-900"
                      : "border-gray-200 bg-white text-gray-900 hover:border-pink-300"
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Geri
          </button>

          {currentQuestion === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answered !== totalQuestions || loading}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Kaydediliyor..." : "Gönder"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!(currentQuestion in responses)}
              className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              İleri →
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
          <p className="font-medium mb-2">💡 İpucu:</p>
          <p>
            Tüm soruları cevapladıktan sonra yanıtlarınız kaydedilecek. İstediğiniz zaman geri
            gidebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
