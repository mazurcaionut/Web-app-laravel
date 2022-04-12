const mix = require("laravel-mix");

// mix.ts("resources/js/index.tsx", "public/js/app.js").react();
// .extract(["react"]);
// mix.js("resources/js/app.js", "public/js")
//     .react()
//     .extract(["react"])
//     .postCss("resources/css/app.css", "public/css", [
//         //
//     ]);
mix.js("resources/js/app.js", "public/js").postCss(
    "resources/css/app.css",
    "public/css",
    [require("postcss-import"), require("tailwindcss"), require("autoprefixer")]
);
