<?php

namespace App\Http\Requests;

use App\Models\Document;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'register_number' => 'required|string|max:255|unique:documents,register_number,' . $this->route('document')->id,
            'sender_name' => 'required|string|max:255',
            'opd_name' => 'required|string|max:255',
            'letter_number' => 'required|string|max:255',
            'letter_subject' => 'required|string',
            'receiver_name' => 'required|string|max:255',
            'incoming_date' => 'required|date',
            'status' => ['required', Rule::in(Document::STATUS_OPTIONS)],
            'department' => ['required', Rule::in(Document::DEPARTMENT_OPTIONS)],
            'update_date' => 'required|date',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'register_number.required' => 'Register Number is required.',
            'register_number.unique' => 'This register number already exists.',
            'sender_name.required' => 'Sender Name is required.',
            'opd_name.required' => 'OPD Name is required.',
            'letter_number.required' => 'Letter Number is required.',
            'letter_subject.required' => 'Letter Subject is required.',
            'receiver_name.required' => 'Receiver Name is required.',
            'incoming_date.required' => 'Incoming Date is required.',
            'incoming_date.date' => 'Please provide a valid incoming date.',
            'status.required' => 'Status is required.',
            'status.in' => 'Please select a valid status.',
            'department.required' => 'Department is required.',
            'department.in' => 'Please select a valid department.',
            'update_date.required' => 'Update Date is required.',
            'update_date.date' => 'Please provide a valid update date.',
        ];
    }
}