<?php

namespace App\Http\Controllers;

use App\Models\Algorithm;
use Illuminate\Http\Request;

class AlgorithmController extends Controller
{
    public function index(Request $request)
    {
        $algorithms = $request->user()->algorithms()->latest()->get();
        
        return response()->json($algorithms);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string',
        ]);

        $algorithm = $request->user()->algorithms()->create([
            'name' => $request->name,
            'code' => $request->code,
        ]);

        return response()->json($algorithm, 201);
    }

    public function show(Request $request, $id)
    {
        $algorithm = $request->user()->algorithms()->findOrFail($id);
        
        return response()->json($algorithm);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:255',
            'code' => 'string',
        ]);

        $algorithm = $request->user()->algorithms()->findOrFail($id);
        $algorithm->update($request->only(['name', 'code']));

        return response()->json($algorithm);
    }

    public function destroy(Request $request, $id)
    {
        $algorithm = $request->user()->algorithms()->findOrFail($id);
        $algorithm->delete();

        return response()->json(['message' => 'Algorithme supprimé']);
    }
}
