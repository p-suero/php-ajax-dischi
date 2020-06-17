<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Dischi musicali</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="../../public/app.css">
    </head>
    <body>
        <!-- inizio header -->
        <header>
            <div class="container">
                <div id="header-left">
                    <img src="../../public/img/logo.png" alt="Logo">
                </div>
                <div id="header-right">
                    <select>
                        <option value="">Tutti gli artitsti</option>
                    </select>
                </div>
            </div>
        </header>
        <main>
        <!-- inizio sezione contenente gli album -->
        <section id="album">
            <div class="container"></div>
        </section>
        </main>
        <!-- template di handlebars -->
        <script id="disco-template" type="text/x-handlebars-template">
            <div class="disco-item">
                <div class="poster-disco">
                    <img src="{{src}}" alt="">
                </div>
                <div class="info-disco">
                    <h2>{{titolo}}</h2>
                    <p class="author">{{autore}}</p>
                    <p class="genre">{{genere}}</p>
                    <p class="year">{{anno}}</p>
                </div>
            </div>
        </script>
        <!-- link script JS -->
        <script src="../../public/js/versione-ajax/app.js" charset="utf-8"></script>
    </body>
</html>
