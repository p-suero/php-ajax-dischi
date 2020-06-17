<?php
    //includo la pagina esterna contenente la lista album
    require "../../public/database/php_dischi.php";
?>
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
                    <select id="author-filter">
                        <option value="">Tutti gli artitsti</option>
                        <?php
                        //creo un array dove inserire gli artisti
                        $artisti = [];
                        //ciclo gli autisti
                        foreach ($dischi as $disco) {
                            //creo una variabile con il nome dell'artista corrente
                            $autore_corrente = $disco["author"];
                            //se l'array non contiene giò l'artista lo aggiungo in quest ultimo e creo un option
                            if (in_array($autore_corrente, $artisti) == false) {
                                $artisti[] = $autore_corrente;?>
                                <option value="<?php echo $autore_corrente ?>">
                                     <?php echo $autore_corrente ?>
                                 </option>
                            <?php
                            }
                        }
                         ?>
                    </select>
                </div>
            </div>
        </header>
        <main>
            <!-- inizio sezione contenente gli album -->
            <section id="album">
                <div class="container">
                    <?php
                    //ciclo l'array per accedere ai singoli dischi e stampare le info
                    foreach ($dischi as $disco) { ?>
                        <div class="disco-item">
                            <div class="poster-disco">
                                <img src="<?php echo $disco["poster"] ?>" alt="">
                            </div>
                            <div class="info-disco">
                                <h2><?php echo $disco["title"] ?></h2>
                                <p class="author"><?php echo $disco["author"] ?></p>
                                <p class="genre"><?php echo $disco["genre"] ?></p>
                                <p class="year"><?php echo $disco["year"] ?></p>
                            </div>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </section>
        </main>
        <!-- template di handlebars -->
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
        <script src="../../public/js/versione-php/app.js" charset="utf-8"></script>
    </body>
</html>
