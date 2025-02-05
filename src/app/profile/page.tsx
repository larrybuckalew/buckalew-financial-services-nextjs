import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'User Profile',
  description: 'Manage your personal and account information',
  keywords: ['profile', 'account settings', 'personal information'],
  path: '/profile'
});

export default function ProfilePage() {
  // Mock user data - in a real application, this would come from your backend
  const userData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Cityville, ST 12345'
    },
    securitySettings: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-01-01'
    },
    communicationPreferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingCommunications: true
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">
        My Profile
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <p>{userData.personalInfo.firstName} {userData.personalInfo.lastName}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <p>{userData.personalInfo.email}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <p>{userData.personalInfo.phone}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <p>{userData.personalInfo.address}</p>
            </div>
            <Link 
              href="/profile/edit" 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition inline-block"
            >
              Edit Profile
            </Link>
          </div>
        </section>

        <div className="space-y-8">
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Security Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Two-Factor Authentication</span>
                <span className={`
                  px-3 py-1 rounded-full text-sm 
                  ${userData.securitySettings.twoFactorEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {userData.securitySettings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Password Change</label>
                <p>{userData.securitySettings.lastPasswordChange}</p>
              </div>
              <Link 
                href="/profile/security" 
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition inline-block"
              >
                Manage Security
              </Link>
            </div>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Communication Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Email Notifications</span>
                <span className={`
                  px-3 py-1 rounded-full text-sm 
                  ${userData.communicationPreferences.emailNotifications 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {userData.communicationPreferences.emailNotifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>SMS Notifications</span>
                <span className={`
                  px-3 py-1 rounded-full text-sm 
                  ${userData.communicationPreferences.smsNotifications 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {userData.communicationPreferences.smsNotifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Marketing Communications</span>
                <span className={`
                  px-3 py-1 rounded-full text-sm 
                  ${userData.communicationPreferences.marketingCommunications 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }
                `}>
                  {userData.communicationPreferences.marketingCommunications ? 'Subscribed' : 'Unsubscribed'}
                </span>
              </div>
              <Link 
                href="/profile/communications" 
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition inline-block"
              >
                Update Preferences
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
