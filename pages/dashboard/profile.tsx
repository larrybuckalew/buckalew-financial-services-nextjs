import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Financial Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <ProfileForm />
        </div>
      </div>
    </DashboardLayout>
  );
}