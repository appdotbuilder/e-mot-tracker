import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Document {
    id: number;
    register_number: string;
    sender_name: string;
    letter_subject: string;
    status: string;
    incoming_date: string;
    [key: string]: unknown;
}

interface Stats {
    total_documents: number;
    in_progress: number;
    completed: number;
}

interface Props {
    stats: Stats;
    recentDocuments: Document[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentDocuments }: Props) {
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
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>
                        <p className="text-gray-600 mt-1">Monitor your document management system</p>
                    </div>
                    <Link href={route('documents.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Document
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Documents</p>
                                    <p className="text-3xl font-bold text-gray-900">{stats.total_documents}</p>
                                </div>
                                <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                                    <FileText className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.in_progress}</p>
                                </div>
                                <div className="bg-yellow-100 text-yellow-600 rounded-full p-3">
                                    <Clock className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Completed</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                                </div>
                                <div className="bg-green-100 text-green-600 rounded-full p-3">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Documents */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Recent Documents
                                </CardTitle>
                                <p className="text-sm text-gray-600 mt-1">
                                    Latest incoming documents
                                </p>
                            </div>
                            <Link href={route('documents.index')}>
                                <Button variant="outline">View All</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {recentDocuments.length > 0 ? (
                            <div className="space-y-4">
                                {recentDocuments.map((document) => (
                                    <div key={document.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-medium text-gray-900">
                                                    {document.register_number}
                                                </h4>
                                                <Badge className={getStatusColor(document.status)}>
                                                    <span className="flex items-center gap-1">
                                                        {getStatusIcon(document.status)}
                                                        {document.status}
                                                    </span>
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                From: {document.sender_name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {document.letter_subject}
                                            </p>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            {new Date(document.incoming_date).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No documents found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}