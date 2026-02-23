import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero / Title */}
      <section className="rounded-2xl bg-white p-6 shadow-sm border">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          정부24 Mini
        </h1>
        <p className="mt-2 text-slate-600">
          민원 신청 · 증명서 발급 · 행정 서비스 정보를 한 곳에서 확인하세요.
        </p>

        {/* Search */}
        <div className="mt-5">
          <div className="flex items-center gap-2 rounded-full border bg-slate-50 px-4 py-3">
            <span className="text-slate-400">🔎</span>
            <input
              type="text"
              placeholder="서비스/민원/증명서 검색"
              className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              검색
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            예: 전입신고, 주민등록등본, 가족관계증명서, 민원 처리현황
          </p>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickCard
          title="민원 신청"
          desc="자주 찾는 민원을 빠르게 신청할 수 있어요."
          to="/complaints/new"
          badge="주요"
        />
        <QuickCard
          title="증명서 발급"
          desc="증명서 발급 기능은 준비 중이에요."
          to="/certificates"
          badge="준비중"
          disabled
        />
        <QuickCard
          title="행정 서비스"
          desc="생활 행정 서비스 정보를 모아볼 수 있어요."
          to="/services"
          badge="준비중"
          disabled
        />
      </section>

      {/* Bottom panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My complaints summary */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">나의 민원</h2>
            <Link
              to="/complaints"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              더보기 →
            </Link>
          </div>

          {/* 로그인/연동 전: 더미 */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <StatBox label="접수" value="0" />
            <StatBox label="처리중" value="0" />
            <StatBox label="완료" value="0" />
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              to="/login"
              className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              로그인 후 확인
            </Link>
            <Link
              to="/complaints/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              민원 신청하기
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            * 이후 백엔드 연동 시 내 민원 상태가 자동으로 표시됩니다.
          </p>
        </div>

        {/* Notice */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">공지사항</h2>
            <button className="text-sm text-slate-600 hover:text-slate-900">
              더보기 →
            </button>
          </div>

          <ul className="mt-4 divide-y">
            <NoticeItem title="[안내] 서비스 점검 공지" date="2026-02-23" />
            <NoticeItem title="[업데이트] 민원 신청 개선" date="2026-02-20" />
            <NoticeItem title="[공지] 이용약관 개정 안내" date="2026-02-10" />
          </ul>

          <p className="mt-3 text-xs text-slate-500">
            * 공지사항은 더미 데이터이며, 추후 API로 연결할 수 있어요.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

/* ----------------- components ----------------- */

const QuickCard = ({ title, desc, to, badge, disabled }) => {
  return (
    <div className="rounded-2xl bg-white border p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              disabled
                ? "bg-slate-100 text-slate-600"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>

      <div className="mt-5">
        {disabled ? (
          <button
            disabled
            className="w-full rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 cursor-not-allowed"
          >
            준비중
          </button>
        ) : (
          <Link
            to={to}
            className="block w-full text-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            바로가기 →
          </Link>
        )}
      </div>
    </div>
  );
};

const StatBox = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-slate-50 border p-4 text-center">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  );
};

const NoticeItem = ({ title, date }) => {
  return (
    <li className="py-3 flex items-center justify-between gap-4">
      <span className="text-sm text-slate-800 line-clamp-1">{title}</span>
      <span className="text-xs text-slate-500 whitespace-nowrap">{date}</span>
    </li>
  );
};