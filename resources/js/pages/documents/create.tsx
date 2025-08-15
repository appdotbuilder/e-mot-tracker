import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface Props {
    statusOptions: string[];
    departmentOptions: string[];
    [key: string]: unknown;
}

export default function CreateDocument({ statusOptions, departmentOptions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        register_number: '',
        sender_name: '',
        opd_name: '',
        letter_number: '',
        letter_subject: '',
        receiver_name: '',
        incoming_date: new Date().toISOString().split('T')[0],
        status: 'Diterima',
        department: '',
        update_date: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('documents.store'));
    };

    return (
        <AppShell>
            <Head title="Add New Document" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href={route('documents.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📄 Add New Document</h1>
                        <p className="text-gray-600 mt-1">Create a new document entry</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="register_number">Register Number *</Label>
                                    <Input
                                        id="register_number"
                                        type="text"
                                        value={data.register_number}
                                        onChange={(e) => setData('register_number', e.target.value)}
                                        placeholder="DOC-YYYY-XXXX"
                                        className={errors.register_number ? 'border-red-500' : ''}
                                    />
                                    {errors.register_number && (
                                        <p className="text-sm text-red-600">{errors.register_number}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="letter_number">Letter Number *</Label>
                                    <Input
                                        id="letter_number"
                                        type="text"
                                        value={data.letter_number}
                                        onChange={(e) => setData('letter_number', e.target.value)}
                                        placeholder="XXX/XXX/YYYY"
                                        className={errors.letter_number ? 'border-red-500' : ''}
                                    />
                                    {errors.letter_number && (
                                        <p className="text-sm text-red-600">{errors.letter_number}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sender_name">Sender Name *</Label>
                                    <Input
                                        id="sender_name"
                                        type="text"
                                        value={data.sender_name}
                                        onChange={(e) => setData('sender_name', e.target.value)}
                                        className={errors.sender_name ? 'border-red-500' : ''}
                                    />
                                    {errors.sender_name && (
                                        <p className="text-sm text-red-600">{errors.sender_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="receiver_name">Receiver Name *</Label>
                                    <Input
                                        id="receiver_name"
                                        type="text"
                                        value={data.receiver_name}
                                        onChange={(e) => setData('receiver_name', e.target.value)}
                                        className={errors.receiver_name ? 'border-red-500' : ''}
                                    />
                                    {errors.receiver_name && (
                                        <p className="text-sm text-red-600">{errors.receiver_name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="opd_name">OPD Name *</Label>
                                <Input
                                    id="opd_name"
                                    type="text"
                                    value={data.opd_name}
                                    onChange={(e) => setData('opd_name', e.target.value)}
                                    className={errors.opd_name ? 'border-red-500' : ''}
                                />
                                {errors.opd_name && (
                                    <p className="text-sm text-red-600">{errors.opd_name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="letter_subject">Letter Subject *</Label>
                                <Textarea
                                    id="letter_subject"
                                    value={data.letter_subject}
                                    onChange={(e) => setData('letter_subject', e.target.value)}
                                    rows={3}
                                    className={errors.letter_subject ? 'border-red-500' : ''}
                                />
                                {errors.letter_subject && (
                                    <p className="text-sm text-red-600">{errors.letter_subject}</p>
                                )}
                            </div>

                            {/* Status and Department */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="department">Department *</Label>
                                    <Select value={data.department} onValueChange={(value) => setData('department', value)}>
                                        <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departmentOptions.map((department) => (
                                                <SelectItem key={department} value={department}>
                                                    {department}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.department && (
                                        <p className="text-sm text-red-600">{errors.department}</p>
                                    )}
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="incoming_date">Incoming Date *</Label>
                                    <Input
                                        id="incoming_date"
                                        type="date"
                                        value={data.incoming_date}
                                        onChange={(e) => setData('incoming_date', e.target.value)}
                                        className={errors.incoming_date ? 'border-red-500' : ''}
                                    />
                                    {errors.incoming_date && (
                                        <p className="text-sm text-red-600">{errors.incoming_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="update_date">Update Date *</Label>
                                    <Input
                                        id="update_date"
                                        type="date"
                                        value={data.update_date}
                                        onChange={(e) => setData('update_date', e.target.value)}
                                        className={errors.update_date ? 'border-red-500' : ''}
                                    />
                                    {errors.update_date && (
                                        <p className="text-sm text-red-600">{errors.update_date}</p>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes/Keterangan</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={4}
                                    placeholder="Additional notes or comments..."
                                    className={errors.notes ? 'border-red-500' : ''}
                                />
                                {errors.notes && (
                                    <p className="text-sm text-red-600">{errors.notes}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center gap-4 pt-6 border-t">
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="h-4 w-4 mr-2" />
                                    {processing ? 'Creating...' : 'Create Document'}
                                </Button>
                                <Link href={route('documents.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppShell>
    );
}