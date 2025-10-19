'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Shield, TrendingUp, Calendar, Bell, Settings, FileText, DollarSign, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    // Show loading while checking authentication
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, show nothing (will redirect)
    if (!session) {
        return null;
    }

    // Enhanced mock data (using real user data from session)
    const userProfile = {
        name: session.user.name || 'User',
        email: session.user.email,
        memberSince: 'January 2023',
        phone: '(555) 123-4567',
        avatar: session.user.image || '/images/default-avatar.png',
        status: 'Active Premium Member'
    };

    const dashboardStats = [
        {
            title: 'Total Coverage',
            value: '$750,000',
            change: '+2.5%',
            changeType: 'positive',
            icon: Shield,
            color: 'blue'
        },
        {
            title: 'Monthly Premium',
            value: '$342',
            change: '-$15',
            changeType: 'positive',
            icon: DollarSign,
            color: 'green'
        },
        {
            title: 'Active Policies',
            value: '3',
            change: '+1',
            changeType: 'positive',
            icon: FileText,
            color: 'purple'
        },
        {
            title: 'Claims Processed',
            value: '12',
            change: '+3',
            changeType: 'neutral',
            icon: CheckCircle,
            color: 'indigo'
        }
    ];

    const insurancePolicies = [
        {
            id: '1',
            type: 'Medicare Supplement',
            provider: 'Blue Cross Blue Shield',
            policyNumber: 'MC-12345-2024',
            premium: '$145/month',
            expirationDate: '12/31/2024',
            status: 'Active',
            coverage: '$50,000',
            icon: Shield
        },
        {
            id: '2',
            type: 'Term Life Insurance',
            provider: 'Prudential Financial',
            policyNumber: 'LF-67890-2025',
            premium: '$89/month',
            expirationDate: '06/30/2025',
            status: 'Active',
            coverage: '$500,000',
            icon: User
        },
        {
            id: '3',
            type: 'Health Insurance',
            provider: 'United Healthcare',
            policyNumber: 'HI-34567-2024',
            premium: '$285/month',
            expirationDate: '12/31/2024',
            status: 'Renewal Pending',
            coverage: '$200,000',
            icon: TrendingUp
        }
    ];

    const upcomingTasks = [
        {
            id: '1',
            title: 'Medicare Open Enrollment',
            description: 'Review and update your Medicare coverage options',
            dueDate: '2024-12-07',
            priority: 'high',
            category: 'enrollment'
        },
        {
            id: '2',
            title: 'Health Insurance Renewal',
            description: 'Renew your health insurance policy before expiration',
            dueDate: '2024-11-30',
            priority: 'medium',
            category: 'renewal'
        },
        {
            id: '3',
            title: 'Annual Policy Review',
            description: 'Schedule annual review with your advisor',
            dueDate: '2024-10-15',
            priority: 'low',
            category: 'review'
        }
    ];

    const recentActivity = [
        {
            date: '2024-01-15',
            action: 'Medicare Policy Renewed',
            details: 'Successfully renewed Medicare Part B coverage for 2024',
            type: 'renewal',
            status: 'completed'
        },
        {
            date: '2024-01-12',
            action: 'Premium Payment',
            details: 'Monthly premium payment of $342 processed',
            type: 'payment',
            status: 'completed'
        },
        {
            date: '2024-01-10',
            action: 'Life Insurance Quote',
            details: 'Requested additional life insurance coverage quote',
            type: 'quote',
            status: 'pending'
        },
        {
            date: '2024-01-08',
            action: 'Document Upload',
            details: 'Uploaded health assessment documents',
            type: 'document',
            status: 'completed'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white"/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome back, {userProfile.name}
                                </h1>
                                <p className="text-gray-600">{userProfile.status} • Member since {userProfile.memberSince}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                                <Bell className="w-6 h-6"/>
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                                <Settings className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {dashboardStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 p-3 rounded-lg bg-${stat.color}-100`}>
                                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`}/>
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <div className="flex items-center">
                                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                        <span className={`ml-2 text-sm ${
                                            stat.changeType === 'positive' ? 'text-green-600' :
                                            stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                                        }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Insurance Policies */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">My Insurance Policies</h2>
                                    <Link href="/quote" className="text-primary hover:text-primary-dark text-sm font-medium">
                                        Add Policy
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {insurancePolicies.map((policy) => (
                                    <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className="p-2 bg-gray-100 rounded-lg">
                                                    <policy.icon className="w-5 h-5 text-gray-600"/>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{policy.type}</h3>
                                                    <p className="text-sm text-gray-600">{policy.provider}</p>
                                                    <p className="text-xs text-gray-500 mt-1">Policy: {policy.policyNumber}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        policy.status === 'Renewal Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {policy.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 mt-1">{policy.coverage}</p>
                                                <p className="text-xs text-gray-500">{policy.premium}</p>
                                                <p className="text-xs text-gray-500">Exp: {new Date(policy.expirationDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            </div>
                            <div className="p-6">
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        {recentActivity.map((activity, index) => (
                                            <li key={index}>
                                                <div className="relative pb-8">
                                                    {index !== recentActivity.length - 1 && (
                                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"/>
                                                    )}
                                                    <div className="relative flex space-x-3">
                                                        <div>
                                                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                                                activity.status === 'completed' ? 'bg-green-500' :
                                                                activity.status === 'pending' ? 'bg-yellow-500' :
                                                                'bg-gray-500'
                                                            }`}>
                                                                {activity.status === 'completed' ? (
                                                                    <CheckCircle className="h-5 w-5 text-white"/>
                                                                ) : activity.status === 'pending' ? (
                                                                    <Clock className="h-5 w-5 text-white"/>
                                                                ) : (
                                                                    <FileText className="h-5 w-5 text-white"/>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1 pt-1.5">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                                <p className="text-sm text-gray-500">{activity.details}</p>
                                                            </div>
                                                            <div className="mt-2 text-xs text-gray-500">
                                                                {new Date(activity.date).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Upcoming Tasks */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {upcomingTasks.map((task) => (
                                    <div key={task.id} className="border-l-4 border-primary pl-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                                                <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <Calendar className="w-3 h-3 text-gray-400"/>
                                                    <span className="text-xs text-gray-500">
                                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <Link href="/quote" className="flex items-center w-full p-3 text-left bg-primary hover:bg-primary-dark text-white rounded-lg transition">
                                    <FileText className="w-5 h-5 mr-3"/>
                                    <span>Request New Quote</span>
                                </Link>
                                <Link href="/contact" className="flex items-center w-full p-3 text-left border border-gray-300 hover:bg-gray-50 rounded-lg transition">
                                    <Phone className="w-5 h-5 mr-3 text-gray-400"/>
                                    <span>Contact Support</span>
                                </Link>
                                <Link href="/calculators" className="flex items-center w-full p-3 text-left border border-gray-300 hover:bg-gray-50 rounded-lg transition">
                                    <TrendingUp className="w-5 h-5 mr-3 text-gray-400"/>
                                    <span>Use Calculators</span>
                                </Link>
                                <Link href="/blog" className="flex items-center w-full p-3 text-left border border-gray-300 hover:bg-gray-50 rounded-lg transition">
                                    <FileText className="w-5 h-5 mr-3 text-gray-400"/>
                                    <span>Read Financial Insights</span>
                                </Link>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow text-white">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2"/>
                                        <span className="text-sm">(555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2"/>
                                        <span className="text-sm">support@buckalewfinancial.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2"/>
                                        <span className="text-sm">Mon-Fri: 8AM-6PM</span>
                                    </div>
                                </div>
                                <Link href="/contact" className="mt-4 inline-block bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                                    Schedule Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
