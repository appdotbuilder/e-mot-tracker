<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Document::query()->latest();
        
        if ($request->filled('search')) {
            $query->searchBySender($request->get('search'));
        }
        
        $documents = $query->paginate(15);
        
        return Inertia::render('documents/index', [
            'documents' => $documents,
            'filters' => [
                'search' => $request->get('search', ''),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('documents/create', [
            'statusOptions' => Document::STATUS_OPTIONS,
            'departmentOptions' => Document::DEPARTMENT_OPTIONS,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $document = Document::create($request->validated());

        return redirect()->route('documents.index')
            ->with('success', 'Document created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        return Inertia::render('documents/show', [
            'document' => $document
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        return Inertia::render('documents/edit', [
            'document' => $document,
            'statusOptions' => Document::STATUS_OPTIONS,
            'departmentOptions' => Document::DEPARTMENT_OPTIONS,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        $document->update($request->validated());

        return redirect()->route('documents.index')
            ->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        $document->delete();

        return redirect()->route('documents.index')
            ->with('success', 'Document deleted successfully.');
    }
}