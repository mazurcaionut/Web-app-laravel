@extends("layouts.app")

@section("title", "Comments")

@section('content')
    <p>Comments from this application</p>

    <ul>
        @foreach ($comments as $comment)
            <li>{{$comment->content}}</li>
        @endforeach
    </ul>
    
@endsection