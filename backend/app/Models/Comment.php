<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $article_id
 * @property string $author_name
 * @property string $content
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Article $article
 */
class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['article_id', 'author_name', 'content'];

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
