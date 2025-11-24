import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* main content area */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      {/* Footer는 나중에 붙이자. 지금은 없음 */}
    </div>
  );
};

export default MainLayout;
