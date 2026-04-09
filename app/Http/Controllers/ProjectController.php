<?php

namespace App\Http\Controllers;

use App\Models\project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Support\Facades\Storage;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(project::all());
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
        'title' => 'required',
        'description' => 'required',
        'technologies' => 'nullable|string',
        'live_link' => 'nullable|url',
        'image' => 'nullable|image',
        ]);

        $data = $request->only('title', 'description', 'technologies', 'live_link');
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('project', 'public');
        }

        $project = Project::create($data);

        return response()->json($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, project $project)
    {
        $request->validate([
        'title' => 'required',
        'description' => 'required',
        'technologies' => 'nullable|string',
        'live_link' => 'nullable|url',
        'image' => 'nullable|image',
        ]);

        $project->title = $request->title;
        $project->description = $request->description;
        $project->technologies = $request->technologies;
        $project->live_link = $request->live_link;

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }

            $project->image = $request->file('image')->store('project', 'public');
        }

        $project->save();

        return response()->json($project);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}
