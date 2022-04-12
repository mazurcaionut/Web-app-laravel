<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel React</title>

    <style>
        html,body {
            padding: 0;
            margin: 0;
            /* font-family: 'Nunito', sans-serif; */
        }
        body {
            min-height: 100vh;
            position: relative;
        }

        #app {
            height: 100%;
            width: 100%;
            position: absolute;
        }
    </style>
    {{-- <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script> --}}
</head>
<body>
    <div id="app"/>
    <script src="{{ asset('js/app.js') }}"></script>
    {{-- <div id="counter"></div> --}}
</body>
</html>