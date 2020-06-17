//importo la libraria j query
var $ = require( "jquery" );
//importo la libreria di handlebars
const Handlebars = require("handlebars");

$(document).ready(function() {

    //preparo il template per il disco
    var template_html = $("#disco-template").html();
    var template_function = Handlebars.compile(template_html);

    //effettuo la chiamata ajax per recuperare i dischi
    $.ajax({
        "url": "../../public/database/ajax_dischi.php",
        "method": "GET",
        "success": function(data) {
            //chiamo la funzione gestione_dati che si occupa di reperire le info dai dischi
            gestione_dati(data);
        },
        "error": function() {
            alert("Si è verificato un errore");
        }
    })

    function gestione_dati(lista_dischi) {
        //ciclo l'array per recuperare i singoli dischi
        for (var i = 0; i < lista_dischi.length; i++) {
            //creo una variabile contenente il disco corrente
            var disco = lista_dischi[i];
            //preparo l'oggetto di handlebars
            var context = {
                "src" : disco.poster,
                "titolo" : disco.title,
                "autore" : disco.author,
                "genere": disco.genre,
                "anno": disco.year
            }
            //inserisco il disco in pagina
            aggiungi_in_pagina(context)
        }
    }

    function aggiungi_in_pagina(placeholder) {
        //preparo la funzione di handlebars
        var html_finale = template_function(placeholder);
        $("#album .container").append(html_finale);
    }
})
