<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('register_number')->unique()->comment('Unique document registration number');
            $table->string('sender_name')->comment('Name of document sender');
            $table->string('opd_name')->comment('OPD (Organisasi Perangkat Daerah) name');
            $table->string('letter_number')->comment('Letter reference number');
            $table->text('letter_subject')->comment('Subject/title of the letter');
            $table->string('receiver_name')->comment('Name of document receiver');
            $table->date('incoming_date')->comment('Date when document was received');
            $table->enum('status', ['Diterima', 'Diproses', 'Selesai', 'Ditolak'])->default('Diterima')->comment('Current document status');
            $table->enum('department', ['Bidang Mutasi', 'Bidang Kepegawaian', 'Bidang Pengembangan', 'Bidang Administrasi'])->comment('Department handling the document');
            $table->date('update_date')->comment('Last update date');
            $table->text('notes')->nullable()->comment('Additional notes or comments');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('register_number');
            $table->index('sender_name');
            $table->index('status');
            $table->index('department');
            $table->index(['status', 'department']);
            $table->index('incoming_date');
            $table->index('update_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};