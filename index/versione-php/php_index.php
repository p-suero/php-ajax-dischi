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
                    <select class="" name="">
                        <option value="">Tutti gli artitsti</option>
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
        <!-- link script JS -->
        <script src="../../public/js/versione-php/app.js" charset="utf-8"></script>
    </body>
</html>
