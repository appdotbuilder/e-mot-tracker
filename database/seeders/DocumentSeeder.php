<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample documents with various statuses
        Document::factory()->received()->count(5)->create();
        Document::factory()->inProgress()->count(8)->create();
        Document::factory()->completed()->count(12)->create();
        Document::factory()->rejected()->count(2)->create();
        
        // Create some specific example documents
        Document::create([
            'register_number' => 'DOC-2024-0001',
            'sender_name' => 'Dr. Ahmad Fauzi',
            'opd_name' => 'Dinas Kesehatan Kota',
            'letter_number' => '001/DKK/2024',
            'letter_subject' => 'Permohonan Penambahan Tenaga Medis di Puskesmas Wilayah Timur',
            'receiver_name' => 'Kepala Bagian Kepegawaian',
            'incoming_date' => now()->subDays(5),
            'status' => 'Diproses',
            'department' => 'Bidang Kepegawaian',
            'update_date' => now()->subDays(2),
            'notes' => 'Sedang dalam proses verifikasi kebutuhan dan anggaran.',
        ]);

        Document::create([
            'register_number' => 'DOC-2024-0002',
            'sender_name' => 'Prof. Siti Nurhaliza',
            'opd_name' => 'Dinas Pendidikan Provinsi',
            'letter_number' => '045/DISDIK/2024',
            'letter_subject' => 'Usulan Program Pelatihan Guru Berbasis Digital',
            'receiver_name' => 'Kepala Bidang Pengembangan',
            'incoming_date' => now()->subDays(10),
            'status' => 'Selesai',
            'department' => 'Bidang Pengembangan',
            'update_date' => now()->subDays(1),
            'notes' => 'Program telah disetujui dan akan dimulai pada bulan depan.',
        ]);

        Document::create([
            'register_number' => 'DOC-2024-0003',
            'sender_name' => 'Ir. Budi Santoso',
            'opd_name' => 'Dinas Pekerjaan Umum',
            'letter_number' => '123/DPU/2024',
            'letter_subject' => 'Laporan Kerusakan Infrastruktur Jalan Protokol',
            'receiver_name' => 'Kepala Bagian Administrasi',
            'incoming_date' => now()->subDays(3),
            'status' => 'Diterima',
            'department' => 'Bidang Administrasi',
            'update_date' => now()->subDays(3),
            'notes' => null,
        ]);
    }
}