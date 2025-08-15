import { Head, Link, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Document {
    id: number;
    register_number: string;
    sender_name: string;
    opd_name: string;
    letter_subject: string;
    status: string;
    department: string;
    incoming_date: string;
    update_date: string;
    [key: string]: unknown;
}

interface PaginatedDocuments {
    data: Document[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface Props {
    documents: PaginatedDocuments;
    filters: {
        search: string;
    };
    [key: string]: unknown;
}

export default function DocumentsIndex({ documents, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('documents.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (document: Document) => {
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
            <Head title="Incoming Mail Management" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📧 Incoming Mail Management</h1>
                        <p className="text-gray-600 mt-1">Manage and track all incoming documents</p>
                    </div>
                    <Link href={route('documents.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Document
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search by sender name..."
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                />
                            </div>
                            <Button type="submit" disabled={processing}>
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                            {filters.search && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setData('search', '');
                                        get(route('documents.index'));
                                    }}
                                >
                                    Clear
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Documents List */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Documents ({documents.meta.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {documents.data.length > 0 ? (
                            <div className="space-y-4">
                                {documents.data.map((document) => (
                                    <div key={document.id} className="border rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {document.register_number}
                                                    </h3>
                                                    <Badge className={getStatusColor(document.status)}>
                                                        <span className="flex items-center gap-1">
                                                            {getStatusIcon(document.status)}
                                                            {document.status}
                                                        </span>
                                                    </Badge>
                                                </div>
                                                
                                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                                    <div>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">From:</span> {document.sender_name}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">OPD:</span> {document.opd_name}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Department:</span> {document.department}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Updated:</span> {new Date(document.update_date).toLocaleDateString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-sm text-gray-700 mb-2">
                                                    <span className="font-medium">Subject:</span> {document.letter_subject}
                                                </p>
                                                
                                                <p className="text-xs text-gray-500">
                                                    Received: {new Date(document.incoming_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 ml-4">
                                                <Link href={route('documents.show', document.id)}>
                                                    <Button variant="outline" size="sm">
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={route('documents.edit', document.id)}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(document)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                                <p className="text-gray-600 mb-4">
                                    {filters.search ? 
                                        `No documents match "${filters.search}"` : 
                                        'Get started by adding your first document'
                                    }
                                </p>
                                <Link href={route('documents.create')}>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Document
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {documents.meta.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex items-center space-x-1">
                            {documents.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}