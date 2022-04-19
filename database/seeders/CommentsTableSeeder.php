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
        // $c1 = new Comment(); 
        // $c1->content = "First post comment content";
        // $c1->commentable_id = 1;
        // $c1->commentable_type = "App\Models\Post";
        // $c1->user_id = 1;
        // $c1->save();
        // $c2 = new Comment(); 
        // $c2->content = "Second comment content";
        // $c2->commentable_id = 1;
        // $c2->commentable_type = "App\Models\Comment";
        // $c2->user_id = 1;
        // $c2->save();
        $commentsPosts = Comment::factory()->count(50)->state(new Sequence(
            function ($sequence) {
                $user = User::get()->random();
                $post = Post::get()->random();
                
                // $newNotification = new Notification(); 
                // $newNotification->content = "First notification";
                // $newNotification->notifiable_id = 1;
                // $newNotification->notifiable_type = "App\Models\Comment";
                // $newNotification->user_id = $user->id;
                // $newNotification->save();

                return [
                    "user_id" => $user->id,
                    "commentable_type" => "App\Models\Post",
                    "commentable_id" => $post->id,
                    "post_id" => $post->id
                ];
            }
        ))->create();
        $commentsComments = Comment::factory()->count(200)->state(new Sequence(
            function ($sequence) {
                // $post = Post::get()->random();
                $user = User::get()->random();
                $comment = Comment::whereNotNull("post_id")->get()->random();

                // $newNotification = new Notification(); 
                // $newNotification->content = "First notification";
                // $newNotification->notifiable_id = 1;
                // $newNotification->notifiable_type = "App\Models\Comment";
                // $newNotification->user_id = 1;
                // $newNotification->save();


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
