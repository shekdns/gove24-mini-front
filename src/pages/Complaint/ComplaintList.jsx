import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ComplaintList = () => {
  const navigate = useNavigate();

  // 🔹 더미 데이터 (나중에 API로 교체)
  const [complaints] = useState([
    {
      id: 1,
      title: "도로 파손으로 인한 위험 신고",
      category: "교통/도로",
      department: "교통행정과",
      status: "접수",
      createdAt: "2026-02-23",
    },
    {
      id: 2,
      title: "보도블럭 파손 민원",
      category: "생활/주거",
      department: "민원행정과",
      status: "처리중",
      createdAt: "2026-02-20",
    },
    {
      id: 3,
      title: "주차 단속 관련 문의",
      category: "교통/도로",
      department: "교통행정과",
      status: "완료",
      createdAt: "2026-02-18",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            민원 목록
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            신청한 민원 내역을 확인할 수 있습니다.
          </p>
        </div>

        <Link
          to="/complaints/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          민원 신청
        </Link>
      </div>

      {/* Filter (UI만) */}
      <div className="flex flex-wrap gap-3 rounded-xl border bg-white p-4">
        <select className="rounded-lg border px-3 py-2 text-sm">
          <option>전체 상태</option>
          <option>접수</option>
          <option>처리중</option>
          <option>완료</option>
        </select>

        <select className="rounded-lg border px-3 py-2 text-sm">
          <option>전체 유형</option>
          <option>생활/주거</option>
          <option>교통/도로</option>
        </select>

        <input
          type="text"
          placeholder="제목 검색"
          className="rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 text-sm text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">번호</th>
              <th className="px-4 py-3 text-left">제목</th>
              <th className="px-4 py-3 text-left">유형</th>
              <th className="px-4 py-3 text-left">부서</th>
              <th className="px-4 py-3 text-left">상태</th>
              <th className="px-4 py-3 text-left">신청일</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {complaints.map((c) => (
              <tr
                key={c.id}
                className="cursor-pointer border-t hover:bg-slate-50"
                onClick={() => navigate(`/complaints/${c.id}`)}
              >
                <td className="px-4 py-3">{c.id}</td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {c.title}
                </td>
                <td className="px-4 py-3">{c.category}</td>
                <td className="px-4 py-3">{c.department}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {c.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {complaints.length === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">
            민원 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;

/* ---------------- UI helpers ---------------- */

const StatusBadge = ({ status }) => {
  const map = {
    접수: "bg-blue-50 text-blue-700",
    처리중: "bg-amber-50 text-amber-700",
    완료: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        map[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};