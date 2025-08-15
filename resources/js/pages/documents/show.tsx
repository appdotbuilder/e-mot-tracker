import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Document {
    id: number;
    register_number: string;
    sender_name: string;
    opd_name: string;
    letter_number: string;
    letter_subject: string;
    receiver_name: string;
    incoming_date: string;
    status: string;
    department: string;
    update_date: string;
    notes?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

interface Props {
    document: Document;
    [key: string]: unknown;
}

export default function ShowDocument({ document }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete document "${document.register_number}"?`)) {
            router.delete(route('documents.destroy', document.id));
        }
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
        <AppShell>
            <Head title={`Document - ${document.register_number}`} />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href={route('documents.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">📄 Document Details</h1>
                            <p className="text-gray-600 mt-1">{document.register_number}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('documents.edit', document.id)}>
                            <Button variant="outline">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="max-w-4xl space-y-6">
                    {/* Status Badge */}
                    <div className="flex justify-center">
                        <Badge className={`${getStatusColor(document.status)} text-lg px-4 py-2`}>
                            <span className="flex items-center gap-2">
                                {getStatusIcon(document.status)}
                                {document.status}
                            </span>
                        </Badge>
                    </div>

                    {/* Document Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Registration Number</label>
                                        <p className="text-lg font-semibold text-gray-900">{document.register_number}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Letter Number</label>
                                        <p className="text-gray-900">{document.letter_number}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Sender Name</label>
                                        <p className="text-gray-900">{document.sender_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Receiver Name</label>
                                        <p className="text-gray-900">{document.receiver_name}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">OPD Name</label>
                                        <p className="text-gray-900">{document.opd_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Department</label>
                                        <p className="text-gray-900">{document.department}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Incoming Date</label>
                                        <p className="text-gray-900">
                                            {new Date(document.incoming_date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Last Update</label>
                                        <p className="text-gray-900">
                                            {new Date(document.update_date).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Letter Subject */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Letter Subject</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-900 leading-relaxed">{document.letter_subject}</p>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    {document.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes/Keterangan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{document.notes}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>System Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Created At</label>
                                    <p className="text-gray-900">
                                        {new Date(document.created_at).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Last Modified</label>
                                    <p className="text-gray-900">
                                        {new Date(document.updated_at).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}