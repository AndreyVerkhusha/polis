<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = Article::factory()->count(5)->create();

        foreach ($articles as $article) {
            Comment::factory()
                ->count(2)
                ->create(['article_id' => $article->id]);
        }
    }
}
