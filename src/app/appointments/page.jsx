import { generatePageMetadata } from '@/lib/seo';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
export const metadata = generatePageMetadata({
    title: 'Appointments',
    description: 'Schedule and manage your insurance consultations',
    keywords: ['appointments', 'consultation', 'scheduling'],
    path: '/appointments'
});
export default function AppointmentsPage() {
    return (<ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Schedule a Consultation
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Available Slots</h2>
            <p>No appointments currently available</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Book New Appointment</h2>
            <p>Booking functionality coming soon</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>);
}
