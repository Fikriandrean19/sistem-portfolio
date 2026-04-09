<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            ['name' => 'PHP', 'level' => 'Intermediate', 'image' => 'php.png'],
            ['name' => 'JavaScript', 'level' => 'Advanced', 'image' => 'java.png'],
            ['name' => 'Laravel', 'level' => 'Advanced', 'image' => 'laravel.png'],
            ['name' => 'Vue.js', 'level' => 'Intermediate', 'image' => 'vuejs.png'],
            ['name' => 'MySQL', 'level' => 'Advanced', 'image' => 'mysql.png'],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
