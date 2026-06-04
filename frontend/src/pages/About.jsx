export default function About() {
  return (
    <>
      {/* ===== ÜST BAŞLIK ===== */}
      <section className="w-full bg-[#F7ECF3] py-32">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h1 className="text-[44px] font-semibold text-gray-900 mb-6">
            Hakkımızda
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Doğum sonu dönem (lohusalık), bebeğin doğmasıyla başlayan, gebelikte vücutta oluşan değişikliklerin gebelik öncesi haline döndüğü ve yaklaşık 6-8 hafta (40-42 gün) süren bir süreçtir. Bu dönemde fiziksel, sosyal ve duygusal değişimler yoğun olarak yaşanır; aile üyeleri ise yeni rollerine ve sorumluluklarına uyum sağlamaya çalışır. Nitelikli doğum sonu bakım hizmetlerine erişimin sınırlı olması, anne ve yenidoğan için çeşitli sağlık risklerini beraberinde getirebilir. Bu nedenle doğru bilgiye ve desteğe ulaşmak, sağlıklı bir başlangıç için kritik öneme sahiptir.
Bu proje kapsamında geliştirilen Chatbot Destekli Web Tabanlı Doğum Sonrası Eğitim Programı; slayt sunumları, bilgilendirici videolar ve chatbot desteğini bir araya getirmektedir. Program annelerin bilgi düzeyini artırmayı, bakım becerilerini geliştirmeyi ve sürece uyumlarını kolaylaştırmayı hedeflemektedir.
Program, doğum sonrası ilk 3 aylık döneme odaklanarak annelere güvenilir, bütüncül ve sürdürülebilir bir eğitim desteği sunmaktadır. 
Sizler için faydalı olması dileğiyle…

          </p>
        </div>
      </section>

      {/* ===== PROJE HAKKINDA ===== */}
      <section className="w-full bg-white py-32">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-[36px] font-semibold text-gray-900 mb-6">
              Proje Hakkında
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Doğum sonu dönem (lohusalık), gebelikte vücutta oluşan
              değişikliklerin gebelik öncesi haline döndüğü ve ortalama 6–8
              hafta süren kritik bir süreçtir. Bu dönemde fiziksel, sosyal ve
              duygusal değişimler yoğun olarak yaşanır.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nitelikli doğum sonu bakım hizmetlerine erişimin sınırlı olması,
              anne ve yenidoğan için çeşitli sağlık risklerini beraberinde
              getirebilmektedir. Bu nedenle doğru bilgiye dayalı, ulaşılabilir
              ve sürdürülebilir destek sistemleri büyük önem taşır.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Bu ihtiyaçlardan yola çıkılarak geliştirilen{" "}
              <strong>Doğum Sonu Bakım Paketi</strong>, chatbot destekli web
              tabanlı bir eğitim ve danışmanlık programıdır.
            </p>
          </div>

          <div className="bg-[#F7ECF3] p-10 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Neler Sunuyoruz?
            </h3>
            <ul className="space-y-4 text-gray-700 text-sm leading-relaxed">
              <li>• Chatbot destekli bilgi ve yönlendirme</li>
              <li>• Eğitim sunumları ve bilgilendirici videolar</li>
              <li>• Fiziksel ve psikolojik sağlığı destekleyen içerikler</li>
              <li>• Yaklaşık 3 aylık doğum sonrası süreci kapsayan yapı</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== ARAŞTIRMACI ===== */}
      <section className="w-full bg-[#FAFAFA] py-32">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-[36px] font-semibold text-gray-900 mb-16 text-center">
            Araştırmacı Hakkında
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <img
              src="/arastırmaci.avif"
              alt="Araştırmacı"
              className="rounded-xl w-full max-w-xs mx-auto"
            />

            <div className="md:col-span-2 text-gray-600 text-lg leading-relaxed">
              <p className="mb-6">
                Eylül 1994’te Adana’da doğmuştur. Lisans eğitimini Erciyes
                Üniversitesi Sağlık Bilimleri Fakültesi Hemşirelik Anabilim
                Dalı’nda tamamlamıştır.
              </p>

              <p className="mb-6">
                Yüksek lisans eğitimini Yozgat Bozok Üniversitesi’nde
                tamamladıktan sonra, Ankara Yıldırım Beyazıt Üniversitesi Sağlık
                Bilimleri Enstitüsü Hemşirelik Doktora Programı’na kabul
                edilmiştir.
              </p>

              <p>
                Akademik çalışmalarının yanı sıra Kayseri Devlet Hastanesi’nde
                klinik hemşire olarak görev yapmakta ve bu projeyi doktora tezi
                kapsamında yürütmektedir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DANIŞMAN ===== */}
      <section className="w-full bg-white py-32">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-[36px] font-semibold text-gray-900 mb-16 text-center">
            Akademik Danışman
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <img
              src="/danisman.avif"
              alt="Danışman"
              className="rounded-xl w-full max-w-xs mx-auto"
            />

            <div className="md:col-span-2 text-gray-600 text-lg leading-relaxed">
              <p className="mb-6">
                Prof. Dr. Sevil Şahin, lisans, yüksek lisans ve doktora
                eğitimlerini hemşirelik alanında tamamlamıştır.
              </p>

              <p className="mb-6">
                Ankara Yıldırım Beyazıt Üniversitesi Sağlık Bilimleri
                Fakültesi’nde öğretim üyesi olarak görev yapmakta, çok sayıda
                akademik yayın ve bilimsel projede yer almaktadır.
              </p>

              <p>
                Bu proje, doktora tezi kapsamında yürütülmekte olup Prof. Dr.
                Sevil Şahin tarafından akademik danışmanlık ile
                desteklenmektedir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
