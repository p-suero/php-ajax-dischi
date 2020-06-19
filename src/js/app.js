//importo la libraria j query
var $ = require( "jquery" );
//importo la libreria di handlebars
const Handlebars = require("handlebars");

$(document).ready(function() {

    //preparo il template per il disco
    var template_html = $("#disco-template").html();
    var template_function = Handlebars.compile(template_html);


    //url file esterno
    var url = "../../database/api.php";

    //se la chiamata viene dall'index html popolo la pagina con ajax
    if ($(".ajax-page").length) {
        console.log("ciao");
        //preparo il template per le option
        var option_template_html = $("#option-template").html();
        var template_function_option = Handlebars.compile(option_template_html);

        //effettuo la chiamata ajax per recuperare i dischi all'apertura della pagina
        chiamata_ajax(false);
    }


    //intercetto il cambio opzione sulla select
    $("#author-filter").change(function() {
        //creo una variabile con il valore dell'option selezionata
        var option_selezionata = $(this).val();
        //se il valore è uguale a "visualizza tutti gli artisti" allora effettuo la chiamata ajax senza parametro "nome artista"
        if (option_selezionata == "") {
            chiamata_ajax(true,"");
        } else {
            //altrimenti effettuo la chiamata ajax passando il parametro dell'artisto selezionato nella select
            chiamata_ajax(true,option_selezionata);
        }
    })

    //*****FUNZIONI********//
    //********************//
    function chiamata_ajax(filter,nome_artista = "") {
        $.ajax({
            "url": url,
            "method": "GET",
            "data" : {
                "artista": nome_artista
            },
            "success": function(data) {
                //rimuovo tutti i dischi in pagina
                $("#album .container").html("");
                //chiamo la funzione gestione_dati che si occupa di raccogliere le info dai dischi
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
            if (filter == false) {
                console.log("ciao");
                //popolo la select
                popola_select(disco.author);
            }
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

    function popola_select(autore) {
        if ($("#author-filter option[value='" + autore + "']").text() != autore) {
            //popolo la select inserendo l'autore
            var context_option = {
                "valore" : autore,
                "testo" : autore
            };
            //preparo la funzione di handlebars
            var html_finale = template_function_option(context_option);
            $("#author-filter").append(html_finale);
        }
    }
})
