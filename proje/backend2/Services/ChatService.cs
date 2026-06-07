using System.Collections.Generic;

namespace Backend.Services
{
    public class ChatService
    {
        private readonly Dictionary<string[], string> _answers = new()
        {
            { new[] { "beslenme", "anne sütü", "mama", "emzirme" }, "Bebek beslenmesi için düzenli aralıklarla besleme yapın ve doktorunuzun önerdiği süt/mama programına uyun." },
            { new[] { "uyku", "uyumuyor", "gece", "uyandır" }, "Bebek için sabit bir uyku rutini oluşturun; karanlık, sessiz bir ortam ve yatmadan önce sakin aktiviteler yardımcı olur." },
            { new[] { "hastalık", "ateş", "ağrı", "halsizlik" }, "Eğer bebekte ateş, iştahsızlık ya da uzun süren rahatsızlık varsa çocuk doktoruna başvurun. Hafif semptomlarda sıvı desteği ve dinlenme öncelikli olmalı." },
            { new[] { "gelişim", "yürüme", "konuşma", "motor" }, "Bebeğinizin gelişimi için günlük oyun, alan ve sevgi dolu iletişim önemlidir. Her bebeğin gelişim hızı farklıdır." },
        };

        public string GetResponse(string question)
        {
            question = (question ?? string.Empty).Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(question))
                return "Lütfen bir soru yazın, size yardımcı olmaktan memnuniyet duyarım.";

            foreach (var entry in _answers)
            {
                foreach (var keyword in entry.Key)
                {
                    if (question.Contains(keyword))
                        return entry.Value;
                }
            }

            return "Bu konuda doğrudan bir cevabım yok, ancak bize iletişim sayfasından daha detaylı yazabilirsiniz.";
        }
    }
}
