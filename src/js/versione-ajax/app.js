//importo la libraria j query
var $ = require( "jquery" );
//importo la libreria di handlebars
const Handlebars = require("handlebars");

$(document).ready(function() {

    //preparo il template per il disco
    var template_html = $("#disco-template").html();
    var template_function = Handlebars.compile(template_html);

    //preparo il template per le option
    var option_template_html = $("#option-template").html();
    var template_function_option = Handlebars.compile(option_template_html);

    //url file esterno
    var url = "http://localhost:8888/boolean-esercizi_php/php-ajax-dischi/public/database/ajax_dischi.php";

    //effettuo la chiamata ajax per recuperare i dischi
    $.ajax({
        "url": url,
        "method": "GET",
        "success": function(data) {
            //chiamo la funzione gestione_dati che si occupa di reperire le info dai dischi
            gestione_dati(data);
        },
        "error": function() {
            alert("Si è verificato un errore");
        }
    })

    //intercetto il cambio opzione sulla select
    $("#author-filter").change(function() {
        //creo una variabile con il valore dell'option selezionata
        var option_selezionata = $(this).val();
        //al cambio della select effettuo una chiamata ajax
        $.ajax({
            "url": url,
            "method": "GET",
            "data": {
                "artista": option_selezionata
            },
            "success": function(data) {
                console.log(data);
            },
            "error": function() {
                alert("Si è verificato un errore");
            }
        })
    })


    //*****FUNZIONI********
    function gestione_dati(lista_dischi) {
        //ciclo l'array per recuperare i singoli dischi
        for (var i = 0; i < lista_dischi.length; i++) {
            //creo una variabile contenente il disco corrente
            var disco = lista_dischi[i];
            //inserisco il disco in pagina
            aggiungi_disco(disco);
            //popolo la select
            popola_select(disco.author);
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
        }
        //preparo la funzione di handlebars
        var html_finale = template_function(context);
        $("#album .container").append(html_finale);
    }

    function popola_select(autore) {
        if ($("#author-filter option[value='" + autore + "']").text() != autore) {
            //popolo la select inserendo l'autore
            var context_option = {
                "valore" : autore,
                "testo" : autore
            }

            //preparo la funzione di handlebars
            var html_finale = template_function_option(context_option);
            $("#author-filter").append(html_finale);
        }
    }
})
