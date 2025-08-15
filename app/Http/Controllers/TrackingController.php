<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    /**
     * Show the public document tracking page.
     */
    public function index()
    {
        return Inertia::render('welcome');
    }

    /**
     * Store a search request for a document.
     */
    public function store(Request $request)
    {
        $request->validate([
            'register_number' => 'required|string',
        ]);

        $document = Document::where('register_number', $request->register_number)->first();

        return Inertia::render('welcome', [
            'searchQuery' => $request->register_number,
            'document' => $document,
            'searched' => true,
        ]);
    }
}