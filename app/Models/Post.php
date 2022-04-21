<?php

namespace App\Models;

use \App\Models\User;
use \App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public $withCount = ["allComments"];

    public function user() {
        return $this->belongsTo(User::class);
    }


    public function comments() {
        return $this->morphMany(Comment::class, 'commentable')->orderBy("updated_at", "DESC");
    }

    public function allComments() {
        return $this->hasMany(Comment::class);
    }


    public function delete() {
        foreach($this->comments as $comment) {
            $comment->delete();
        }

        return parent::delete();
    }
}
