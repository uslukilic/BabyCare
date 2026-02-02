export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative w-full min-h-[85vh] md:h-[85vh]">
        {/* Arka plan görsel */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/hero-bg.jpg')", // senin görselin
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* İçerik */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 h-full flex flex-col justify-center pb-16">
          {/* Üst metin */}
          <div className="text-center text-white mb-16">
            <h1 className="text-[36px] md:text-[40px] font-medium mb-6 leading-snug">
              Anne ve bebeğin birlikte güçlendiği yeni bir başlangıç için
            </h1>

            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Emeğinle ve ilginle annelik yolculuğunu şekillendirmeye hazır
              mısın?
            </p>
          </div>

          {/* Buton */}
          <div className="flex justify-center mb-16 md:mb-24">
            <button
              className="px-12 py-4 border border-white text-white rounded-full text-sm tracking-wide transition
                               hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]"
            >
              Hemen Başla
            </button>
          </div>

          {/* Alt kartlar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-6 md:-mt-12">
            <div className="bg-white/20 backdrop-blur-md p-8 text-center text-white">
              <h3 className="text-lg font-medium mb-3">Fiziksel Bakım</h3>
              <p className="text-sm text-gray-200">
                Vücudunuzun iyileşme sürecini destekliyoruz.
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-8 text-center text-white">
              <h3 className="text-lg font-medium mb-3">Duygusal Destek</h3>
              <p className="text-sm text-gray-200">
                Doğum sonrası ağrılarınızı hafifletiyoruz.
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md p-8 text-center text-white">
              <h3 className="text-lg font-medium mb-3">Aile Rehberliği</h3>
              <p className="text-sm text-gray-200">
                Enerjinizi yeniden kazanmanıza yardımcı oluyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HERO → SECTION GEÇİŞ ================= */}
      <div className="h-12 md:h-20 bg-white" />

      {/* ================= DOĞUM SONRASI DESTEK ================= */}
      <section className="w-full bg-white py-32 -mt-16 md:-mt-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Sol içerik */}
            <div>
              <h2 className="text-[42px] font-semibold text-gray-900 mb-8 leading-tight">
                Doğum Sonrası
                <br />
                Destek
              </h2>

              <p className="text-gray-600 text-lg max-w-md mb-12">
                Lohusalık döneminde annenin ve bebeğin ihtiyaçlarına özel,
                güvenilir ve kapsamlı bakım hizmetleri sunuyoruz.
              </p>

              <button
                className="px-10 py-4 border border-gray-900 rounded-full text-sm font-medium
                                 hover:bg-gray-900 hover:text-white transition"
              >
                Hemen Başla
              </button>
            </div>

            {/* Sağ görsel */}
            <div className="relative flex justify-center">
              <img
                src="/bebek.avif" // senin görselin
                alt="Doğum Sonrası Destek"
                className="rounded-2xl w-full max-w-md object-cover"
              />

              {/* Mor istatistik kutusu */}
              <div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2
                              bg-[#A77DBA] text-white px-16 py-10 rounded-xl flex gap-16"
              >
                <div className="text-center">
                  <div className="text-4xl font-semibold mb-2">150+</div>
                  <div className="text-sm">Mutlu Anneler</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-semibold mb-2">15</div>
                  <div className="text-sm">Güvenilir Hizmet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-12 md:h-20 bg-white" />

      <section className="w-full bg-[#F7ECF3] py-32">
        <div className="max-w-6xl mx-auto px-8">
          {/* Başlık */}
          <div className="text-center mb-20">
            <h2 className="text-[42px] font-semibold text-gray-900 mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Doğum sonrası dönemde anne ve bebeğe özel destek sağlıyoruz.
            </p>
          </div>

          {/* Kartlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Kart 1 */}
            <div className="relative rounded-2xl overflow-hidden bg-white">
              <img
                src="/hizmet1.avif" // senin görselin
                alt="Duygusal Destek"
                className="w-full h-[300px] object-cover"
              />

              <div className="bg-white px-10 py-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Duygusal Destek
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lohusalıkta yaşanan duygusal değişimlere anlayışlı ve
                  profesyonel yaklaşım.
                </p>
              </div>
            </div>

            {/* Kart 2 */}
            <div className="relative rounded-2xl overflow-hidden bg-white">
              <img
                src="/hizmet2.avif" // senin görselin
                alt="Fiziksel Destek"
                className="w-full h-[300px] object-cover"
              />

              <div className="bg-white px-10 py-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Fiziksel Destek
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Anne vücudunun iyileşme sürecine özel egzersiz ve bakım
                  önerileri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
