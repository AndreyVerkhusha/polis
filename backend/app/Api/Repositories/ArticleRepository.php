<?php

declare(strict_types=1);

namespace App\Api\Repositories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * @method Builder<Article> getBuilder()
 */
class ArticleRepository extends Repository
{
    protected const string MODEL = Article::class;

    public function getLatestArticles(): Collection
    {
        return $this->getBuilder()
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function loadComments(Article $article): Article
    {
        $article->load('comments');

        return $article;
    }

    /**
     * @param array{
     *     title:string,
     *     content:string
     * } $data
     */
    public function create(array $data): Article
    {
        return $this->getBuilder()->create([
            'title' => $data['title'],
            'content' => $data['content'],
        ]);
    }
}
