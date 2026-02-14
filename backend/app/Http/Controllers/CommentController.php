<?php

namespace App\Http\Controllers;

use App\Api\Services\CommentService;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function __construct(private readonly CommentService $commentService) {}

    public function store(Article $article, StoreCommentRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $comment = $this->commentService->createForArticle($article, $validated);

        return response()->json([
            'data' => CommentResource::make($comment),
        ], 201);
    }
}
