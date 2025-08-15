<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Document
 *
 * @property int $id
 * @property string $register_number
 * @property string $sender_name
 * @property string $opd_name
 * @property string $letter_number
 * @property string $letter_subject
 * @property string $receiver_name
 * @property \Illuminate\Support\Carbon $incoming_date
 * @property string $status
 * @property string $department
 * @property \Illuminate\Support\Carbon $update_date
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Document newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Document newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Document query()
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereRegisterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereSenderName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereOpdName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereLetterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereLetterSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereReceiverName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereIncomingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereUpdateDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Document whereUpdatedAt($value)
 * @method static \Database\Factories\DocumentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Document extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'register_number',
        'sender_name',
        'opd_name',
        'letter_number',
        'letter_subject',
        'receiver_name',
        'incoming_date',
        'status',
        'department',
        'update_date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'incoming_date' => 'date',
        'update_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'documents';

    /**
     * Status options for documents.
     *
     * @var array<string>
     */
    public const STATUS_OPTIONS = [
        'Diterima',
        'Diproses', 
        'Selesai',
        'Ditolak'
    ];

    /**
     * Department options for documents.
     *
     * @var array<string>
     */
    public const DEPARTMENT_OPTIONS = [
        'Bidang Mutasi',
        'Bidang Kepegawaian',
        'Bidang Pengembangan',
        'Bidang Administrasi'
    ];

    /**
     * Scope a query to only include documents with a specific status.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to search documents by sender name.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchBySender($query, string $search)
    {
        return $query->where('sender_name', 'like', '%' . $search . '%');
    }
}