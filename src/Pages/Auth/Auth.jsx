import { Outlet } from "react-router";

export default function Auth() {
  return (
    <>
      <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-[#161412] border border-[#2e2a24] rounded-2xl overflow-hidden">
          <div className="p-8 flex flex-col gap-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
