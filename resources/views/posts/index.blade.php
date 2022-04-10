@extends("layouts.app")

@section("title", "Posts")

@section('content')
    <p>Posts from this application</p>

    <ul>
        @foreach ($posts as $post)
            <li>{{$post->title}}</li>
        @endforeach
    </ul>
    
@endsection