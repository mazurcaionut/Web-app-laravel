<?php

namespace App\Models;

use \App\Models\User;
use \App\Models\Notification;
use \App\Models\Post;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $with = ["comments", "user"];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function notification() {
        return $this->morphOne(Notification::class, "notifiable");
    }

    public function delete() {
        foreach($this->comments as $comment) {
            $comment->delete();
        }

        if($this->notification) {
            $this->notification->delete();
        }


        return parent::delete();
    }

}
