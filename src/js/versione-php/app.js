//importo la libraria j query
var $ = require( "jquery" );
//importo la libreria di handlebars
const Handlebars = require("handlebars");

$(document).ready(function() {

    //preparo il template per il disco
    var template_html = $("#disco-template").html();
    var template_function = Handlebars.compile(template_html);

    //url file esterno
    var url = "http://localhost:8888/boolean-esercizi_php/php-ajax-dischi/database/ajax_dischi.php";


    //intercetto il cambio opzione sulla select
    $("#author-filter").change(function() {
        //creo una variabile con il valore dell'option selezionata
        var option_selezionata = $(this).val();
        //se il valore è uguale a "visualizza tutti gli artisti" allora effettuo la chiamata ajax senza parametro "nome artista"
        if (option_selezionata == "") {
            chiamata_ajax("");
        } else {
            //altrimenti effettuo la chiamata ajax passando il parametro dell'artista selezionata nella select
            chiamata_ajax(option_selezionata);
        }
    })


    //*****FUNZIONI********//
    //********************//

    function chiamata_ajax(nome_artista) {
        $.ajax({
            "url": url,
            "method": "GET",
            "data" : {
                "artista": nome_artista
            },
            "success": function(data) {
                //rimuovo tutti i dischi in pagina
                $("#album .container").html("");

                //chiamo la funzione gestione_dati che si occupa di reperire le info dai dischi
                gestione_dati(data);
            },
            "error": function() {
                alert("Si è verificato un errore");
            }
        })
    }

    function gestione_dati(lista_dischi) {
        //ciclo l'array per recuperare i singoli dischi
        for (var i = 0; i < lista_dischi.length; i++) {
            //creo una variabile contenente il disco corrente
            var disco = lista_dischi[i];
            //inserisco il disco in pagina
            aggiungi_disco(disco);
        }
    }

    function aggiungi_disco(disco) {
        //preparo l'oggetto di handlebars
        var context = {
            "src" : disco.poster,
            "titolo" : disco.title,
            "autore" : disco.author,
            "genere": disco.genre,
            "anno": disco.year
        };
        //preparo la funzione di handlebars
        var html_finale = template_function(context);
        $("#album .container").append(html_finale);
    }
})
