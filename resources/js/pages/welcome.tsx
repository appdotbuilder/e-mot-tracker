import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Document {
    id: number;
    register_number: string;
    sender_name: string;
    opd_name: string;
    letter_subject: string;
    status: string;
    department: string;
    update_date: string;
    notes?: string;
    [key: string]: unknown;
}

interface Props {
    document?: Document;
    searchQuery?: string;
    searched?: boolean;
    [key: string]: unknown;
}

export default function Welcome({ document, searchQuery = '', searched = false }: Props) {
    const { auth } = usePage<SharedData>().props;
    
    const { data, setData, post, processing } = useForm({
        register_number: searchQuery,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tracking.search'));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Diterima':
                return 'bg-blue-100 text-blue-800';
            case 'Diproses':
                return 'bg-yellow-100 text-yellow-800';
            case 'Selesai':
                return 'bg-green-100 text-green-800';
            case 'Ditolak':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Diterima':
                return <FileText className="h-4 w-4" />;
            case 'Diproses':
                return <Clock className="h-4 w-4" />;
            case 'Selesai':
                return <CheckCircle className="h-4 w-4" />;
            case 'Ditolak':
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    return (
        <>
            <Head title="E-MOT - Electronic Monitoring System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 text-white rounded-lg p-2">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">E-MOT</h1>
                                    <p className="text-sm text-gray-600">Electronic Monitoring System</p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            📄 Track Your Documents
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Monitor the progress of your documents in real-time
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Document Search
                            </CardTitle>
                            <CardDescription>
                                Enter your document registration number to track its current status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="flex gap-4">
                                <Input
                                    type="text"
                                    placeholder="Enter registration number (e.g., DOC-1234-5678)"
                                    value={data.register_number}
                                    onChange={(e) => setData('register_number', e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Searching...' : 'Search'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Search Results */}
                    {searched && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Search Results</CardTitle>
                                <CardDescription>
                                    Results for "{searchQuery}"
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {document ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">
                                                Document Found
                                            </h3>
                                            <Badge className={getStatusColor(document.status)}>
                                                <span className="flex items-center gap-1">
                                                    {getStatusIcon(document.status)}
                                                    {document.status}
                                                </span>
                                            </Badge>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Document Details</h4>
                                                <dl className="space-y-2">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Registration Number</dt>
                                                        <dd className="text-sm text-gray-900">{document.register_number}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Sender</dt>
                                                        <dd className="text-sm text-gray-900">{document.sender_name}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">OPD</dt>
                                                        <dd className="text-sm text-gray-900">{document.opd_name}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Subject</dt>
                                                        <dd className="text-sm text-gray-900">{document.letter_subject}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Processing Information</h4>
                                                <dl className="space-y-2">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Current Department</dt>
                                                        <dd className="text-sm text-gray-900">{document.department}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Last Update</dt>
                                                        <dd className="text-sm text-gray-900">
                                                            {new Date(document.update_date).toLocaleDateString('id-ID')}
                                                        </dd>
                                                    </div>
                                                    {document.notes && (
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                                            <dd className="text-sm text-gray-900">{document.notes}</dd>
                                                        </div>
                                                    )}
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            Document Not Found
                                        </h3>
                                        <p className="text-gray-600">
                                            No document found with registration number "{searchQuery}". 
                                            Please check the number and try again.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Features Section */}
                    {!searched && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                                🚀 Key Features
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-fit mx-auto mb-4">
                                                <Search className="h-6 w-6" />
                                            </div>
                                            <h4 className="font-semibold mb-2">Real-time Tracking</h4>
                                            <p className="text-sm text-gray-600">
                                                Track your documents instantly with our real-time monitoring system
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="bg-green-100 text-green-600 rounded-full p-3 w-fit mx-auto mb-4">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <h4 className="font-semibold mb-2">Document Management</h4>
                                            <p className="text-sm text-gray-600">
                                                Comprehensive document management with full audit trail
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center">
                                            <div className="bg-purple-100 text-purple-600 rounded-full p-3 w-fit mx-auto mb-4">
                                                <Clock className="h-6 w-6" />
                                            </div>
                                            <h4 className="font-semibold mb-2">Status Updates</h4>
                                            <p className="text-sm text-gray-600">
                                                Get instant status updates and progress notifications
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}