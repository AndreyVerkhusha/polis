<?php

declare(strict_types=1);

namespace App\Api\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use RuntimeException;

abstract class Repository
{
    protected function getBuilder(): Builder
    {
        if (! defined('static::MODEL')) {
            throw new RuntimeException('MODEL constant is not defined');
        }

        /** @var class-string<Model> $class */
        $class = static::MODEL;

        return $class::query();
    }
}
