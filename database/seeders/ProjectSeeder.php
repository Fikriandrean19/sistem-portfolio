<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::create([
            'title' => 'Personal Portfolio',
            'description' => 'A personal portfolio website built with Laravel and Vue.js to showcase my projects and skills.',
            'github' => '',
            'image' => '',
            'technologies' => 'Laravel, Vue.js, Tailwind CSS',
            'live_link' => '',
        ]);

        Project::create([
            'title' => 'E-commerce Store',
            'description' => 'An e-commerce store built with Laravel and React, featuring product listings, shopping cart, and checkout functionality.',
            'github' => '',
            'image' => '',
            'technologies' => 'Laravel, React, Stripe API',
            'live_link' => '',
        ]);
    }
}
