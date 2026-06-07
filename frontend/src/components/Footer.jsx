import { Link } from "react-router-dom";
import logo from "../assets/logo.avif.jpeg";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Logo + açıklama */}
          <div>
            <img
              src={logo}
              alt="Doğum Sonu Bakım Paketi"
              className="h-12 md:h-16 mb-6 w-auto object-contain"
            />

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Doğum sonrası dönemde anne ve bebeğe özel, güvenilir ve
              profesyonel bakım hizmetleri sunuyoruz.
            </p>
          </div>

          {/* Menü */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">Sayfalar</h4>

            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-primary-600 transition">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-600 transition">
                  Hakkında
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-primary-600 transition">
                  Videolar
                </Link>
              </li>
              <li>
                <Link to="/survey" className="hover:text-primary-600 transition">
                  Anket
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-600 transition">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6">İletişim</h4>

            <ul className="space-y-4 text-sm text-gray-600">
              <li>
                <span className="font-medium">Adres:</span> Yozgat Bozok Üniversitesi Erdoğan Akdağ Yerleşkesi Sağlık Bilimleri Fakültesi
                <br />Atatürk Yolu 7. Km 66900 Merkez / YOZGAT
              </li>
              <li>
                <span className="font-medium">Tel:</span> 5456281694
              </li>
              <li>
                <span className="font-medium">E-posta:</span> dogumsonrasiegitim@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Alt bar */}
        <div className="border-t border-gray-200 mt-16 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Doğum Sonu Bakım Paketi. Tüm hakları
          saklıdır.
        </div>
      </div>
    </footer>
  );
}
