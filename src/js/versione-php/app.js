//importo la libraria j query
var $ = require( "jquery" );
//importo la libreria di handlebars
const Handlebars = require("handlebars");

$(document).ready(function() {

    //preparo il template per il disco
    var template_html = $("#disco-template").html();
    var template_function = Handlebars.compile(template_html);

    //url file esterno
    var url = "http://localhost:8888/boolean-esercizi_php/php-ajax-dischi/public/database/ajax_dischi.php";


    //intercetto il cambio opzione sulla select
    $("#author-filter").change(function() {
        //creo una variabile con il valore dell'option selezionata
        var option_selezionata = $(this).val();
        //se il valore è uguale a "visualizza tutti gli artisti" allora effettuo la chiamata_ajax_generale
        if (option_selezionata == "") {
            chiamata_ajax(false,"");
        } else {
            chiamata_ajax(true,option_selezionata);
        }
    })


    //*****FUNZIONI********//
    //********************//

    function chiamata_ajax(filter,nome_artista) {
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
                gestione_dati(data,filter);
            },
            "error": function() {
                alert("Si è verificato un errore");
            }
        })
    }

    function gestione_dati(lista_dischi,filter) {
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
