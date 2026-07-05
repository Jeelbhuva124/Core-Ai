import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';
import { AdminHeader } from './Header';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader title="Admin Panel" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
