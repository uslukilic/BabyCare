import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.avif.jpeg";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-start h-[130px]">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-12">
            <img
              src={logo}
              alt="Doğum Sonu Bakım Paketi"
              className="h-20 md:h-28 lg:h-36 w-auto object-contain"
            />
          </Link>

          {/* Menü */}
          <div className="flex items-center space-x-12">
            <Link
              to="/"
              className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              Ana Sayfa
            </Link>

            <Link
              to="/about"
              className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              Hakkında
            </Link>

            <Link
              to="/chat"
              className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              Chat
            </Link>

            <Link
              to="/faq"
              className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              SSS
            </Link>

            {user && (
              <>
                <Link
                  to="/videos"
                  className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Videolar
                </Link>

                <Link
                  to="/survey"
                  className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Anket
                </Link>

                <Link
                  to="/scale-assessment"
                  className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
                >
                  Sağlık Ölçekleri
                </Link>
              </>
            )}

            <Link
              to="/contact"
              className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              İletişim
            </Link>
            {user?.role === "Admin" && (
              <Link
                to="/admin"
                className="text-[15px] font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Admin Panel
              </Link>

            )}
          </div>

          {/* Sağ Auth */}
          <div className="ml-auto">
            {user ? (
              <button
                onClick={logout}
                className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                Çıkış
              </button>
            ) : (
              <Link
                to="/login"
                className="text-base font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                Giriş
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
