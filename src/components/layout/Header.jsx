import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const navClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600";

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-gray-900">
          Gov24 Mini
        </Link>

        {/* Main Nav */}
        <nav className="hidden gap-6 md:flex">
          <NavLink to="/complaints" className={navClass}>
            민원 신청
          </NavLink>
          <NavLink to="/certificates" className={navClass}>
            증명서 발급
          </NavLink>
          <NavLink to="/services" className={navClass}>
            행정 서비스
          </NavLink>
          <NavLink to="/admin" className={navClass}>
            관리자
          </NavLink>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-lg border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            로그인
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            회원가입
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t bg-white">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 text-sm">
          <NavLink to="/complaints" className={navClass}>
            민원
          </NavLink>
          <NavLink to="/certificates" className={navClass}>
            증명서
          </NavLink>
          <NavLink to="/services" className={navClass}>
            서비스
          </NavLink>
          <NavLink to="/admin" className={navClass}>
            관리자
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
