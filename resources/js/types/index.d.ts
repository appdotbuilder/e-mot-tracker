import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Document {
    id: number;
    register_number: string;
    sender_name: string;
    opd_name: string;
    letter_number: string;
    letter_subject: string;
    receiver_name: string;
    incoming_date: string;
    status: 'Diterima' | 'Diproses' | 'Selesai' | 'Ditolak';
    department: 'Bidang Mutasi' | 'Bidang Kepegawaian' | 'Bidang Pengembangan' | 'Bidang Administrasi';
    update_date: string;
    notes?: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
