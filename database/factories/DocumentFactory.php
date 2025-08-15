<?php

namespace Database\Factories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Document>
     */
    protected $model = Document::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'register_number' => $this->faker->unique()->numerify('DOC-####-####'),
            'sender_name' => $this->faker->name(),
            'opd_name' => $this->faker->randomElement([
                'Dinas Pendidikan',
                'Dinas Kesehatan',
                'Dinas Pekerjaan Umum',
                'Dinas Sosial',
                'Dinas Keuangan',
                'Sekretariat Daerah'
            ]),
            'letter_number' => $this->faker->numerify('###/###/####'),
            'letter_subject' => $this->faker->sentence(6),
            'receiver_name' => $this->faker->name(),
            'incoming_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'status' => $this->faker->randomElement(Document::STATUS_OPTIONS),
            'department' => $this->faker->randomElement(Document::DEPARTMENT_OPTIONS),
            'update_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'notes' => $this->faker->optional()->paragraph(),
        ];
    }

    /**
     * Indicate that the document is currently being processed.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function inProgress()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Diproses',
        ]);
    }

    /**
     * Indicate that the document is completed.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function completed()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Selesai',
        ]);
    }

    /**
     * Indicate that the document was just received.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function received()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Diterima',
        ]);
    }

    /**
     * Indicate that the document was rejected.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function rejected()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Ditolak',
        ]);
    }
}