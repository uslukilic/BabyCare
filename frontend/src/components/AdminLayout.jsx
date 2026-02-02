import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-md text-sm font-medium transition
     ${
       location.pathname === path
         ? "bg-pink-100 text-pink-700"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          <Link to="/admin/users" className={linkClass("/admin/users")}>
            Kullanıcılar
          </Link>

          <Link to="/admin/contacts" className={linkClass("/admin/contacts")}>
            İletişim
          </Link>
          <Link to="/admin/videos" className={linkClass("/admin/videos")}>
            Videolar
          </Link>
          <Link to="/admin/surveys" className={linkClass("/admin/surveys")}>
            Anketler
          </Link>
          <Link to="/admin/stats" className={linkClass("/admin/stats")}>
            İstatistikler
          </Link>
        </nav>
      </aside>

      {/* ===== CONTENT ===== */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
