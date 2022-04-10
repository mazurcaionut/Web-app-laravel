<html>
    <head>
        <title>Enclosures</title>
    </head>
    <body>
        @if($animal)
            <h1>{{$animal}} Enclosure</h1>
            <p>Swansea zoo will soon be home to an enclosure for {{$animal}}.</p>
        @else
            <h1>No animal!</h1>
        @endif
    </body>
</html>