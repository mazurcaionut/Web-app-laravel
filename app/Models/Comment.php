<?php

namespace App\Models;

use \App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->morphMany(Comment::class, 'commentable');
    }


    public function delete() {
        foreach($this->comments as $comment) {
            $comment->delete();
        }

        return parent::delete();
    }

}
