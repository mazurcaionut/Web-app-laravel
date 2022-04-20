<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Str;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($index = 1; $index <= 250; $index++) {

            $comment = Comment::where("id", $index)->first();
            $user = User::get()->random();

            $notificationContent = "Initial value";
            $notificationUserId = 1;

            if(Str::contains($comment->commentable_type, "Post")) {
                $notificationContent = $comment->user->name . " made a comment on your post " . $comment->post->title;
                $notificationUserId = Post::where("id", $comment->commentable_id)->first()->user_id;
            
                if($notificationUserId === $comment->post->user_id) {
                    $notificationUserId = 0;
                }

            } else {
                $notificationContent = $comment->user->name . " replied to one of your comments from the post " . $comment->post->title;
                $notificationUserId = Comment::where("id", $comment->commentable_id)->first()->user_id;


                if($notificationUserId === $comment->user_id) {
                    $notificationUserId = 0;
                }
            }

            if($notificationUserId !== 0 ) {

                $newNotification = new Notification();
            
                $newNotification->notifiable_type = "App\Models\Comment";
                $newNotification->notifiable_id = $comment->id;
                $newNotification->content = $notificationContent;
                $newNotification->user_id = $notificationUserId;
                $newNotification->save();
            }
        }
    }
}
