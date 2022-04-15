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
            sentence($nbWords = rand($min = 3, $max = 15), $variableNbWords = true),
            'description' => $this->faker->
                sentence($nbWords = rand($min = 500, $max = 1000), $variableNbWords = true),
            'image' => $this->faker->imageUrl(600, 600),
        ];
    }
}
