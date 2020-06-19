<?php
    //inserisco la lista dei dischi
    require "dischi.php";

    //verifico se l'utente mi passa una query string in Get
    if (!empty($_GET["artista"])) {
        //creo un array dove inserire i dischi che corrispondono alla query string
        $dischi_filtrati = [];
        //ciclo i dischi per copiare nell'array solo i dischi che corrispondono alla ricerca
        foreach ($dischi as $disco) {
            //se il disoco corrisponde alla ricerca lo inserisco nell'array
            if ($disco["author"] == $_GET["artista"]) {
                $dischi_filtrati[] = $disco;
            }
        }
        //assegno il nuovo array alla variabile
        $dischi = $dischi_filtrati;
    }

    //inserisco questa funzione per far leggere correttamente il json a j-query
    header('Content-Type: application/json');
    //stampo i dati tradotti in json
    echo json_encode($dischi);
?>
