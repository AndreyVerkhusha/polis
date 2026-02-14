<?php

declare(strict_types=1);

namespace App\Api\Services;

use App\Api\Repositories\ArticleRepository;
use App\Models\Article;
use Illuminate\Support\Collection;

readonly class ArticleService
{
    public function __construct(private ArticleRepository $articleRepository) {}

    public function getLatestArticles(): Collection
    {
        return $this->articleRepository->getLatestArticles();
    }

    public function showWithComments(Article $article): Article
    {
        return $this->articleRepository->loadComments($article);
    }

    /**
     * @param  array{
     *     title:string,
     *     content:string
     * } $data
     */
    public function create(array $data): Article
    {
        return $this->articleRepository->create($data);
    }
}
