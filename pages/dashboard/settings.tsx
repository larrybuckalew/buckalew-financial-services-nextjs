import DashboardLayout from '@/components/layout/DashboardLayout';
import UserSettingsForm from '@/components/settings/UserSettingsForm';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <UserSettingsForm />
        </div>
      </div>
    </DashboardLayout>
  );
}