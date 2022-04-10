<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->
                sentence($nbWords = rand($min = 3, $max = 9), $variableNbWords = true),
            'description' => $this->faker->
                sentence($nbWords = rand($min = 3, $max = 17), $variableNbWords = true),
            'image' => $this->faker->url(),
        ];
    }
}
