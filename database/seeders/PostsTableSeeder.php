<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $post1 = new Post();
        $post1->title = 'Post title';
        $post1->description = "Post description";
        $post1->image = "url";
        $post1->user_id = 1;

        $post1->save();


        $posts = Post::factory()->count(10)->state(new Sequence(
            function ($sequence) {
                $user = User::get()->random();


                return [
                    "user_id" => $user->id,
                ];
            }
        ))->create();

    }
}
