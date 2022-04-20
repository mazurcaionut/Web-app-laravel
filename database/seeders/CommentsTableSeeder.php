<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $commentsPosts = Comment::factory()->count(50)->state(new Sequence(
            function ($sequence) {
                $user = User::get()->random();
                $post = Post::get()->random();
        
                return [
                    "user_id" => $user->id,
                    "commentable_type" => "App\Models\Post",
                    "commentable_id" => $post->id,
                    "post_id" => $post->id
                ];
            }
        ))->create();
        $commentsComments = Comment::factory()->count(50)->state(new Sequence(
            function ($sequence) {
                $user = User::get()->random();
                $comment = Comment::whereNotNull("post_id")->get()->random();


                return [
                    "user_id" => $user->id,
                    "commentable_type" => "App\Models\Comment",
                    "commentable_id" => $comment->id,
                    "post_id" => $comment->post_id,
                ];
            }
        ))->create();
    }
}
