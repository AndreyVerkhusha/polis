<?php

declare(strict_types=1);

namespace App\Api\Repositories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Builder;

/**
 * @method Builder<Comment> getBuilder()
 */
class CommentRepository extends Repository
{
    protected const string MODEL = Comment::class;

    /**
     * @param array{
     *     article_id:int,
     *     author_name:string,
     *     content:string
     * } $data
     */
    public function create(array $data): Comment
    {
        return $this->getBuilder()->create([
            'article_id' => $data['article_id'],
            'author_name' => $data['author_name'],
            'content' => $data['content'],
        ]);
    }
}
