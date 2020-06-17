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
            "url": "../../public/database/ajax_dischi.php",
            "method": "GET",
            "success": function(data) {
                //rimuovo tutti i dischi dalla pagina
                $("#album .container").empty();
                for (var i = 0; i < data.length; i++) {
                    var disco = data[i];
                    //salvo in variabile l'autore corrente
                    var autore_corrente = data[i].author;
                    //verifico se l'autore corrente è uguale al valore del option selezionata
                    if (option_selezionata == autore_corrente || option_selezionata == "") {
                        //eseguo la funzione aggiungi disco
                        aggiungi_disco(disco);
                    }
                }
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
