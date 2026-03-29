import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type AdminLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Bookings", path: "/admin/bookings" },
  { label: "Messages", path: "/admin/messages" },
  { label: "Subscribers", path: "/admin/subscribers" },
  { label: "Calendar", path: "/admin/calendar" },
];

const AdminLayout = ({
  title,
  description,
  children,
}: AdminLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F8F4]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-[#e6ece8] bg-white px-6 py-8 lg:block">
          <div className="mb-10">
            <p className="mb-2 inline-flex rounded-full border border-[#d9e3dc] bg-[#f7faf7] px-4 py-1 text-xs font-medium text-[#355847]">
              Taawa CRM
            </p>
            <h2 className="text-2xl font-bold text-[#17252A]">Admin Panel</h2>
            <p className="mt-2 text-sm text-[#5f6f68]">
              Manage bookings, messages, subscribers, and more.
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#d7f36a] text-[#17252A]"
                      : "text-[#355847] hover:bg-[#f3f6f3]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 border-t border-[#e6ece8] pt-6">
            <button
              onClick={async () => {
                navigate("/admin/login", { replace: true });
              }}
              className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:opacity-90"
            >
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 px-6 py-8 md:px-8 lg:px-10">
          <div className="mb-8 border-b border-[#e6ece8] pb-6">
            <p className="mb-2 inline-flex rounded-full border border-[#d9e3dc] bg-white px-4 py-1 text-sm text-[#355847]">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-[#17252A] md:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm text-[#5f6f68] md:text-base">
                {description}
              </p>
            )}
          </div>

          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;