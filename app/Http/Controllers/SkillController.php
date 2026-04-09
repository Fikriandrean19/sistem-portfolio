<?php

namespace App\Http\Controllers;

use App\Models\skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(SKill::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
        'name' => 'required',
        'level' => 'required',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
       ]);

       $data = [
        'name' => $request->name,
        'level' => $request->level,
       ];

       if ($request->hasFile('image')) {
        $path = $request->file('image')->store('skill', 'public');
        $data['image'] = $path;
       }

       $skill = Skill::create($data);
       return response()->json([
        'name' => $skill->name,
        'level' => $skill->level,
        'image' => Storage::url($skill->image),
       ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(skill $skill)
    {
        return response()->json($skill);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(skill $skill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, skill $skill)
    {
        // $skill = Skill::find($skill);

        $request ->validate([
            'name' => 'required',
            'level' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $skill->name = $request->input('name');
        $skill->level = $request->input('level');

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($skill->image) {
                Storage::disk('public')->delete($skill->image);
            }
            // Simpan gambar baru
            $path = $request->file('image')->store('skill', 'public');
            $skill->image = $path;
        }
        $skill->save();
        return response()->json([
            'name' => $skill->name,
            'level' => $skill->level,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(skill $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Skill deleted successfully']);
    }
}
