import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 민원
import ComplaintList from "./pages/Complaint/ComplaintList";
import ComplaintCreate from "./pages/Complaint/ComplaintCreate";
import ComplaintDetail from "./pages/Complaint/ComplaintDetail";

// 관리자
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminComplaintList from "./pages/Admin/AdminComplaintList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 민원 라우트 */}
          <Route path="/complaints" element={<ComplaintList />} />
          <Route path="/complaints/new" element={<ComplaintCreate />} />
          <Route path="/complaints/:id" element={<ComplaintDetail />} />

          {/* 관리자 라우트 */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminComplaintList />} />

          {/* 임시 페이지들 */}
          <Route path="/certificates" element={<div>증명서 발급(준비중)</div>} />
          <Route path="/services" element={<div>행정 서비스(준비중)</div>} />

          {/* Not Found */}
          <Route path="*" element={<div>페이지가 없습니다.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
