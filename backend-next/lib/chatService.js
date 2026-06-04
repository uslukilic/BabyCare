const answers = [
  {
    keywords: ["beslenme", "anne sütü", "mama", "emzirme"],
    response:
      "Bebek beslenmesi için düzenli aralıklarla besleme yapın ve doktorunuzun önerdiği süt/mama programına uyun.",
  },
  {
    keywords: ["uyku", "uyumuyor", "gece", "uyandır"],
    response:
      "Bebek için sabit bir uyku rutini oluşturun; karanlık, sessiz bir ortam ve yatmadan önce sakin aktiviteler yardımcı olur.",
  },
  {
    keywords: ["hastalık", "ateş", "ağrı", "halsizlik"],
    response:
      "Eğer bebekte ateş, iştahsızlık ya da uzun süren rahatsızlık varsa çocuk doktoruna başvurun. Hafif semptomlarda sıvı desteği ve dinlenme öncelikli olmalı.",
  },
  {
    keywords: ["gelişim", "yürüme", "konuşma", "motor"],
    response:
      "Bebeğinizin gelişimi için günlük oyun, alan ve sevgi dolu iletişim önemlidir. Her bebeğin gelişim hızı farklıdır.",
  },
];

export function getChatAnswer(question) {
  const normalized = (question || "").trim().toLowerCase();
  if (!normalized) return "Lütfen bir soru yazın.";

  for (const entry of answers) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.response;
    }
  }

  return "Bu konuda doğrudan bir cevabım yok, ancak bize iletişim sayfasından daha detaylı yazabilirsiniz.";
}
