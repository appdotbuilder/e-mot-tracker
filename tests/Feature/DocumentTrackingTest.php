<?php

namespace Tests\Feature;

use App\Models\Document;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentTrackingTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_tracking_page_is_accessible(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('welcome')
        );
    }

    public function test_can_search_for_existing_document(): void
    {
        $document = Document::factory()->create([
            'register_number' => 'TEST-2024-001',
            'sender_name' => 'John Doe',
            'letter_subject' => 'Test Document Subject',
        ]);

        $response = $this->post(route('tracking.search'), [
            'register_number' => 'TEST-2024-001',
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('welcome')
                ->has('document')
                ->where('document.register_number', 'TEST-2024-001')
                ->where('document.sender_name', 'John Doe')
                ->where('searched', true)
        );
    }

    public function test_search_for_non_existing_document(): void
    {
        $response = $this->post(route('tracking.search'), [
            'register_number' => 'NONEXISTENT-001',
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('welcome')
                ->where('document', null)
                ->where('searchQuery', 'NONEXISTENT-001')
                ->where('searched', true)
        );
    }

    public function test_search_validation_required(): void
    {
        $response = $this->post(route('tracking.search'), [
            'register_number' => '',
        ]);

        $response->assertSessionHasErrors(['register_number']);
    }
}