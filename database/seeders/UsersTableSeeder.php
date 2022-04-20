<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = "Mazi";
        $user->email = "mazurcaionut99@gmail.com";
        $user->password = Hash::make("123456");
        $user->role = "Admin";
        $user->image = "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg";
        $user->save();

        User::factory()->count(25)->create();
    }
}
