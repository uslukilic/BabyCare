import { useState } from "react";

const faqs = [
  {
    q: "Doğumdan sonra vücudum ne zaman toparlanır, bu süreç ne kadar sürer?",
    a: `Vücudun toparlanması genellikle 6 hafta içinde büyük ölçüde gerçekleşir. Ancak her annenin iyileşme süreci farklıdır ve zamana ihtiyaç vardır.\nDaha ayrıntılı bilgi için Modül 1’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Normal doğum yaptım. Dikiş yerimde ağrı var, nasıl bakım yapmalıyım?",
    a: `İlk haftalarda hafif ağrı ve hassasiyet normaldir. Bölgenin temiz ve kuru tutulması iyileşmeyi destekler. Şiddetli ağrı veya kötü kokulu akıntı varsa doktora başvurulmalıdır.\nDaha ayrıntılı bilgi için Modül 1’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Kanamamın miktarı ve rengi değişiyor, bu normal mi?",
    a: `Doğum sonrası kanamanın rengi değişir ve miktarı zamanla azalır; bu genellikle normaldir. Ancak ani artış veya büyük pıhtılar varsa doktora başvurulmalıdır.\nDaha ayrıntılı bilgi için Modül 1’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Doğumdan sonra durup dururken ağlamak istiyorum, bu normal mi?",
    a: `Doğumdan sonraki ilk günlerde hormon değişiklikleri ve yorgunluk nedeniyle sebepsiz ağlama, hassasiyet ve ruh halinde dalgalanmalar görülebilir. Bu durum genellikle “annelik hüznüdür” ve 1–2 hafta içinde azalır. Ancak mutsuzluk, yoğun kaygı ya da isteksizlik uzun sürerse bir sağlık profesyonelinden destek alınmalıdır.\nDaha ayrıntılı bilgi için Modül 1’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Bebeğimi emzirirken nasıl tutmalıyım, memeyi doğru kavradığını nasıl anlarım?",
    a: `Bebeğinizin yüzü ve gövdesi size dönük olmalı; başı, omuzları ve kalçası aynı hizada olmalıdır. Sadece meme ucunu değil, kahverengi alanın büyük kısmını ağzına almalıdır. Çenesinin memeye değmesi ve emerken yutkunma sesi duymanız doğru kavradığını gösterir.\nDaha ayrıntılı bilgi için Modül 2’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Emzirirken ağrı olması normal mi?",
    a: `İlk günlerde hafif hassasiyet olabilir; ancak şiddetli ve devam eden ağrı genellikle bebeğin memeyi yanlış kavramasından kaynaklanır. Bu durumda emzirme pozisyonunu gözden geçirmek önemlidir.\nDaha ayrıntılı bilgi için Modül 2’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Sütümü ne zaman ve nasıl sağmalıyım? Elle sağmak mı yoksa pompa kullanmak mı daha kolay ve etkili olur?",
    a: `Bebeğiniz ememiyorsa, erken doğduysa, memeleriniz çok dolu ve gerginse ya da işe başlayacağınız için süt depolamak istiyorsanız sağım yapabilirsiniz. Elle sağma özellikle ilk günlerde ve kolostrum döneminde pratik olabilir. Pompa ise düzenli sağım yapmak ya da daha fazla süt depolamak isteyen anneler için kolaylık sağlar. Hangi yöntemin daha uygun olduğu annenin konforuna, ihtiyacına ve kullanım sıklığına göre değişebilir.\nDaha ayrıntılı bilgi için Modül 2’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Sağdığım sütü nasıl saklamalı ve bebeğime nasıl vermeliyim?",
    a: `Sağılmış süt uygun kapta oda sıcaklığında kısa süre, buzdolabında veya dondurucuda daha uzun süre saklanabilir. Bebeğe verirken benmari usulü ısıtılmalı, kaynatılmamalıdır.\nDaha ayrıntılı bilgi için Modül 2’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Meme ucum çatladı ve canım yanıyor. Emzirmeye devam etmeli miyim?",
    a: `Çatlaklar genellikle bebeğin memeyi yanlış kavramasına bağlıdır. Doğru pozisyon sağlandığında iyileşme başlar ve çoğu durumda emzirmeye devam edilebilir. Ağrı çok şiddetliyse destek almak önemlidir.\nDaha ayrıntılı bilgi için Modül 2’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Bebeğimi ne sıklıkla emzirmeliyim, doyduğunu nasıl anlarım?",
    a: `Yenidoğan bebekler genellikle 2–3 saatte bir emmek ister; ancak her bebeğin ihtiyacı farklıdır. İlk haftalarda bebeğin istediği her an emzirmek önerilir. Emme sonrası sakinleşmesi, ellerinin gevşemesi, günde en az 5–6 kez idrar yapması ve düzenli kilo alması doyduğunu gösterir.\nDaha ayrıntılı bilgi için Modül 3’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Göbeğine dokunmaya korkuyorum… Altını değiştirirken ya da banyosunu yaptırırken zarar verir miyim? Nelere dikkat etmeliyim?",
    a: `Göbek bağına nazikçe dokunmanız zarar vermez. Önemli olan bölgenin temiz ve kuru kalmasıdır. Alt değiştirirken bezin göbeğin altında kalmasına dikkat edilmeli, banyo sonrası ise iyice kurulanmalıdır. Kızarıklık, kötü koku veya akıntı olursa doktora başvurulmalıdır.\nDaha ayrıntılı bilgi için Modül 3’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Aşılar ve tarama testleri gerçekten bu kadar önemli mi? Birini geciktirirsem ya da yaptırmazsam bebeğime bir şey olur mu?",
    a: `Aşılar, bebeğinizi bulaşıcı hastalıklara karşı korur. Tarama testleri ise bazı hastalıkları erken dönemde fark etmeyi sağlar. Gecikmeler koruyuculuğu azaltabilir ve hastalık riskini artırabilir. Bu nedenle aşı ve tarama takvimine uygun hareket etmek çok önemlidir.\nDaha ayrıntılı bilgi için Modül 3’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Doğumdan sonra eşimle ne zaman yeniden birlikte olabiliriz?",
    a: `Genellikle doğumdan yaklaşık 4–6 hafta sonra, kanama büyük ölçüde azaldığında ve iyileşme tamamlandığında ilişki önerilir. Ancak en önemli nokta annenin kendini fiziksel ve duygusal olarak hazır hissetmesidir. Acele etmek zorunda değilsiniz.\nDaha ayrıntılı bilgi için Modül 4’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Doğum sonrası ilk ilişkide ağrı yaşamak normal mi? Rahatlamak için ne yapabilirim?",
    a: `Doğum sonrası özellikle emzirme döneminde hormonlara bağlı vajinal kuruluk ve hassasiyet olabilir. Bu nedenle ilk ilişkilerde hafif ağrı görülebilir. Ön sevişmeye zaman ayırmak, kayganlaştırıcı kullanmak ve rahat bir ortam sağlamak yardımcı olabilir. Şiddetli veya devam eden ağrı varsa doktora başvurulmalıdır.\nDaha ayrıntılı bilgi için Modül 4’deki videoları izleyebilirsiniz.`,
  },
  {
    q: "Emzirirken hamile kalır mıyım? Hangi korunma yöntemlerini güvenle kullanabilirim?",
    a: `Sadece emzirmek her zaman gebelikten korumaz. İlk 6 ay içinde, sadece anne sütü veriliyorsa ve adet başlamamışsa emzirmenin koruyuculuğu olabilir; ancak bu yöntem her zaman güvenilir değildir. Bu nedenle emzirme dönemine uygun korunma yöntemlerinden birini seçmek önemlidir.\nDaha ayrıntılı bilgi için Modül 4’deki videoları izleyebilirsiniz.`,
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="min-h-screen bg-[#F7ECF3] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-6">Sıkça Sorulan Sorular</h1>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center"
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="text-primary-600">{open === idx ? "–" : "+"}</span>
              </button>

              {open === idx && (
                <div className="px-6 pb-6 text-gray-700 whitespace-pre-line">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
