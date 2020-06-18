//importo la libraria j query
var $ = require( "jquery" );
//importo la libreria di handlebars
const Handlebars = require("handlebars");

$(document).ready(function() {

    //preparo il template per il disco
    var template_html = $("#disco-template").html();
    var template_function = Handlebars.compile(template_html);

    //intercetto il cambio opzione sulla select
    $("#author-filter").change(function() {
        //creo una variabile con il valore dell'option selezionata
        var option_selezionata = $(this).val();
        //al cambio della select effettuo una chiamata ajax
        $.ajax({
            "url": "http://localhost:8888/boolean-esercizi_php/php-ajax-dischi/public/database/ajax_dischi.php",
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

    //funzione che aggiunge in pagina il disco
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
})
