import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPLAINT_CATEGORIES, DEPARTMENTS, PRIORITIES } from "../../constants/complaintOptions";

const ComplaintCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "LIVING",
    department: "CIVIL",
    priority: "NORMAL",
    content: "",
    contactEmail: "",
    isPublic: false,
    files: [],
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, files }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "제목을 입력해 주세요.";
    else if (form.title.trim().length < 5) next.title = "제목은 5자 이상 권장합니다.";
    if (!form.content.trim()) next.content = "내용을 입력해 주세요.";
    else if (form.content.trim().length < 10) next.content = "내용은 10자 이상 권장합니다.";
    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      next.contactEmail = "이메일 형식이 올바르지 않습니다.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: 여기에 API 연동(axios) 붙이면 됨
    // 지금은 화면 플로우만
    alert("민원 신청이 접수되었습니다(더미).");
    navigate("/complaints");
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">민원 신청</h1>
          <p className="mt-1 text-sm text-slate-600">
            내용을 입력하면 담당 부서로 접수됩니다. (현재는 UI 단계)
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="submit"
            form="complaint-form"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            접수하기
          </button>
        </div>
      </div>

      {/* Form */}
      <form id="complaint-form" onSubmit={onSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: basic info */}
          <Card title="기본 정보" desc="민원 유형과 제목을 입력해 주세요.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="민원 유형">
                <Select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  options={COMPLAINT_CATEGORIES}
                />
              </Field>

              <Field label="우선순위">
                <Select
                  name="priority"
                  value={form.priority}
                  onChange={onChange}
                  options={PRIORITIES}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="제목" required error={errors.title}>
                <Input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  placeholder="예) 도로 파손으로 인한 위험 신고"
                />
              </Field>
            </div>
          </Card>

          {/* Card: content */}
          <Card title="상세 내용" desc="상황을 구체적으로 작성하면 처리 속도가 빨라집니다.">
            <Field label="내용" required error={errors.content}>
              <Textarea
                name="content"
                value={form.content}
                onChange={onChange}
                placeholder="발생 위치, 시간, 상세 상황 등을 작성해 주세요."
                rows={10}
              />
            </Field>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="연락 이메일(선택)" error={errors.contactEmail}>
                <Input
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={onChange}
                  placeholder="example@email.com"
                />
              </Field>

              <div className="flex items-end">
                <label className="flex w-full items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={onChange}
                    className="h-4 w-4"
                  />
                  공개 민원으로 등록
                  <span className="ml-auto text-xs text-slate-500">
                    (샘플 옵션)
                  </span>
                </label>
              </div>
            </div>
          </Card>

          {/* Card: attachments */}
          <Card title="첨부파일" desc="사진/문서 등을 첨부할 수 있어요. (최대 5개 권장)">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-600">
                JPG/PNG/PDF 등 (현재는 업로드 UI만)
              </div>

              <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                파일 선택
                <input
                  type="file"
                  multiple
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {form.files.length > 0 ? (
              <ul className="mt-4 divide-y rounded-lg border bg-white">
                {form.files.map((f) => (
                  <li key={f.name} className="flex items-center justify-between px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {f.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(f.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      선택됨
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed bg-slate-50 p-6 text-center text-sm text-slate-600">
                아직 선택된 파일이 없습니다.
              </div>
            )}
          </Card>
        </div>

        {/* Right: sidebar */}
        <div className="space-y-6">
          <Card title="접수 설정" desc="담당 부서를 선택해 주세요.">
            <Field label="담당 부서">
              <Select
                name="department"
                value={form.department}
                onChange={onChange}
                options={DEPARTMENTS}
              />
            </Field>

            <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">처리 흐름</p>
              <ol className="mt-2 list-decimal pl-5 space-y-1 text-slate-600">
                <li>접수</li>
                <li>담당자 배정</li>
                <li>처리중</li>
                <li>완료</li>
              </ol>
            </div>
          </Card>

          <Card title="미리보기" desc="입력 내용 요약입니다.">
            <div className="space-y-2 text-sm">
              <SummaryRow label="유형" value={labelOf(COMPLAINT_CATEGORIES, form.category)} />
              <SummaryRow label="부서" value={labelOf(DEPARTMENTS, form.department)} />
              <SummaryRow label="우선순위" value={labelOf(PRIORITIES, form.priority)} />
              <SummaryRow label="제목" value={form.title || "-"} />
              <SummaryRow label="첨부" value={`${form.files.length}개`} />
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default ComplaintCreate;

/* ---------------- UI helpers (page-local components) ---------------- */

const Card = ({ title, desc, children }) => (
  <section className="rounded-2xl border bg-white p-6 shadow-sm">
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {desc ? <p className="mt-1 text-sm text-slate-600">{desc}</p> : null}
    </div>
    {children}
  </section>
);

const Field = ({ label, required, error, children }) => (
  <div>
    <div className="mb-1 flex items-center gap-2">
      <label className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </label>
      {error ? <span className="ml-auto text-xs text-rose-600">{error}</span> : null}
    </div>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />
);

const Select = ({ options, ...props }) => (
  <select
    {...props}
    className="w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-slate-500">{label}</span>
    <span className="max-w-[70%] text-right font-medium text-slate-800 break-words">
      {value}
    </span>
  </div>
);

const labelOf = (options, value) => {
  const found = options.find((o) => o.value === value);
  return found ? found.label : "-";
};