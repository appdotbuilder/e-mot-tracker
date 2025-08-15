<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_documents' => Document::count(),
            'in_progress' => Document::withStatus('Diproses')->count(),
            'completed' => Document::withStatus('Selesai')->count(),
        ];

        $recentDocuments = Document::latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentDocuments' => $recentDocuments,
        ]);
    }
}