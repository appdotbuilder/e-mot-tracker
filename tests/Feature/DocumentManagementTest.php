<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_authenticated_user_can_view_documents_index(): void
    {
        Document::factory()->count(3)->create();

        $response = $this->actingAs($this->user)->get('/documents');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('documents/index')
                ->has('documents.data', 3)
        );
    }

    public function test_unauthenticated_user_cannot_view_documents(): void
    {
        $response = $this->get('/documents');

        $response->assertRedirect('/login');
    }

    public function test_can_create_document(): void
    {
        $documentData = [
            'register_number' => 'DOC-2024-TEST',
            'sender_name' => 'Jane Smith',
            'opd_name' => 'Test OPD',
            'letter_number' => '001/TEST/2024',
            'letter_subject' => 'Test subject for document creation',
            'receiver_name' => 'John Receiver',
            'incoming_date' => '2024-01-15',
            'status' => 'Diterima',
            'department' => 'Bidang Administrasi',
            'update_date' => '2024-01-15',
            'notes' => 'Test notes',
        ];

        $response = $this->actingAs($this->user)
            ->post('/documents', $documentData);

        $response->assertRedirect('/documents');
        $this->assertDatabaseHas('documents', [
            'register_number' => 'DOC-2024-TEST',
            'sender_name' => 'Jane Smith',
        ]);
    }

    public function test_can_update_document(): void
    {
        $document = Document::factory()->create([
            'register_number' => 'DOC-2024-UPDATE',
            'status' => 'Diterima',
        ]);

        $updateData = [
            'register_number' => 'DOC-2024-UPDATE',
            'sender_name' => $document->sender_name,
            'opd_name' => $document->opd_name,
            'letter_number' => $document->letter_number,
            'letter_subject' => $document->letter_subject,
            'receiver_name' => $document->receiver_name,
            'incoming_date' => $document->incoming_date->format('Y-m-d'),
            'status' => 'Selesai',
            'department' => $document->department,
            'update_date' => now()->format('Y-m-d'),
            'notes' => 'Updated notes',
        ];

        $response = $this->actingAs($this->user)
            ->patch("/documents/{$document->id}", $updateData);

        $response->assertRedirect('/documents');
        $this->assertDatabaseHas('documents', [
            'id' => $document->id,
            'status' => 'Selesai',
            'notes' => 'Updated notes',
        ]);
    }

    public function test_can_delete_document(): void
    {
        $document = Document::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete("/documents/{$document->id}");

        $response->assertRedirect('/documents');
        $this->assertDatabaseMissing('documents', [
            'id' => $document->id,
        ]);
    }

    public function test_dashboard_shows_correct_statistics(): void
    {
        Document::factory()->received()->count(3)->create();
        Document::factory()->inProgress()->count(5)->create();
        Document::factory()->completed()->count(7)->create();

        $response = $this->actingAs($this->user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('dashboard')
                ->where('stats.total_documents', 15)
                ->where('stats.in_progress', 5)
                ->where('stats.completed', 7)
        );
    }
}