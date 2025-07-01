<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $table = 'posts';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['Title', 'description', 'image', 'user_id'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
