import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ComplaintDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ 더미 데이터 (나중에 API로 교체)
  const complaint = useMemo(() => {
    return {
      id,
      title: "도로 파손으로 인한 위험 신고",
      category: "교통/도로",
      department: "교통행정과",
      priority: "보통",
      status: "처리중",
      createdAt: "2026-02-23 10:21",
      isPublic: false,
      contactEmail: "sample@email.com",
      content:
        "OO구 OO로 123 인근 도로가 파손되어 차량 및 보행자 안전에 위험이 있습니다.\n" +
        "파손 범위는 약 1m 정도이며 야간에 특히 위험합니다.\n" +
        "빠른 조치 부탁드립니다.",
      attachments: [
        { name: "road_damage_1.jpg", sizeKb: 532.4 },
        { name: "road_damage_2.jpg", sizeKb: 621.8 },
      ],
      history: [
        {
          at: "2026-02-23 10:21",
          title: "접수",
          desc: "민원이 접수되었습니다.",
        },
        {
          at: "2026-02-23 11:05",
          title: "담당자 배정",
          desc: "교통행정과 담당자에게 배정되었습니다.",
        },
        {
          at: "2026-02-24 09:30",
          title: "처리중",
          desc: "현장 확인 및 조치 계획 수립 중입니다.",
        },
      ],
    };
  }, [id]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">
              {complaint.title}
            </h1>
            <StatusBadge status={complaint.status} />
          </div>
          <p className="mt-1 text-sm text-slate-600">
            민원번호 #{complaint.id} · 신청일 {complaint.createdAt}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            뒤로가기
          </button>

          <Link
            to="/complaints"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            목록으로
          </Link>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary card */}
          <Card title="민원 정보" desc="기본 정보 및 설정을 확인합니다.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow label="유형" value={complaint.category} />
              <InfoRow label="담당 부서" value={complaint.department} />
              <InfoRow label="우선순위" value={complaint.priority} />
              <InfoRow label="공개 여부" value={complaint.isPublic ? "공개" : "비공개"} />
              <InfoRow label="연락 이메일" value={complaint.contactEmail || "-"} />
              <InfoRow label="상태" value={<StatusBadge status={complaint.status} />} />
            </div>
          </Card>

          {/* Content card */}
          <Card title="상세 내용" desc="민원 내용을 확인합니다.">
            <div className="whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm text-slate-800">
              {complaint.content}
            </div>
          </Card>

          {/* Attachments */}
          <Card title="첨부파일" desc="첨부된 파일 목록입니다. (현재는 더미 UI)">
            {complaint.attachments?.length ? (
              <ul className="divide-y rounded-xl border bg-white">
                {complaint.attachments.map((f) => (
                  <li key={f.name} className="flex items-center justify-between px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">{f.name}</p>
                      <p className="text-xs text-slate-500">{f.sizeKb} KB</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      다운로드(예정)
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed bg-slate-50 p-6 text-center text-sm text-slate-600">
                첨부파일이 없습니다.
              </div>
            )}
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card title="처리 이력" desc="민원 처리 단계 진행 상황입니다.">
            <Timeline items={complaint.history} />
          </Card>

          {/* Next actions (UI only) */}
          <Card title="다음 작업" desc="향후 기능으로 확장할 영역입니다.">
            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500"
              >
                상태 변경(관리자 전용, 예정)
              </button>
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500"
              >
                코멘트 추가(예정)
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              * 관리자 페이지에서 상태 변경/코멘트 기능을 붙이면 포트폴리오 퀄리티가 확 올라갑니다.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;

/* ---------------- UI helpers ---------------- */

const Card = ({ title, desc, children }) => (
  <section className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {desc ? <p className="mt-1 text-sm text-slate-600">{desc}</p> : null}
    </div>
    {children}
  </section>
);

const InfoRow = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 p-4">
    <div className="text-xs font-semibold text-slate-500">{label}</div>
    <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    접수: "bg-blue-50 text-blue-700",
    처리중: "bg-amber-50 text-amber-700",
    완료: "bg-green-50 text-green-700",
    반려: "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
};

const Timeline = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed bg-slate-50 p-6 text-center text-sm text-slate-600">
        처리 이력이 없습니다.
      </div>
    );
  }

  return (
    <ol className="relative space-y-4">
      {items.map((it, idx) => (
        <li key={`${it.at}-${idx}`} className="relative pl-7">
          {/* dot */}
          <span className="absolute left-1 top-1.5 h-3 w-3 rounded-full bg-slate-900" />
          {/* line */}
          {idx !== items.length - 1 ? (
            <span className="absolute left-2.5 top-5 h-full w-px bg-slate-200" />
          ) : null}

          <div className="rounded-xl border bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">{it.title}</p>
                <p className="mt-1 text-sm text-slate-600">{it.desc}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-slate-500">{it.at}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};