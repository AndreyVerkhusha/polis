<?php

namespace App\Http\Controllers;

use App\Api\Services\ArticleService;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function __construct(private readonly ArticleService $articleService) {}

    public function index(): JsonResponse
    {
        $articles = $this->articleService->getLatestArticles();

        return response()->json([
            'data' => ArticleResource::collection($articles),
        ]);
    }

    public function show(Article $article): JsonResponse
    {
        $article = $this->articleService->showWithComments($article);

        return response()->json([
            'data' => ArticleResource::make($article),
        ]);
    }

    public function store(StoreArticleRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $article = $this->articleService->create($validated);

        return response()->json([
            'data' => ArticleResource::make($article),
        ], 201);
    }
}
