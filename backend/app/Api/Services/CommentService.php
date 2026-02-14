<?php

declare(strict_types=1);

namespace App\Api\Services;

use App\Api\Repositories\CommentRepository;
use App\Models\Article;
use App\Models\Comment;

readonly class CommentService
{
    public function __construct(private CommentRepository $commentRepository) {}

    /**
     * @param  array{
     *     author_name:string,
     *     content:string
     * } $data
     */
    public function createForArticle(Article $article, array $data): Comment
    {
        return $this->commentRepository->create([
            'article_id' => $article->id,
            'author_name' => $data['author_name'],
            'content' => $data['content'],
        ]);
    }
}
