<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::create([
            'name' => 'Fikri Andrean',
            'email' => 'fikri@example.com',
            'bio' => 'A passionate web developer with experience in Laravel and Vue.js.',
            'github' => 'https://github.com/fikriandrean',
            'linkedin' => 'https://linkedin.com/in/fikriandrean',
        ]);
    }
}
