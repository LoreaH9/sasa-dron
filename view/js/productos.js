//global variables
var cards, card;

//DOMContentLoaded
$(document).ready(function(){
    $.ajax({
        url: "controller/controllerProductos.php",
        dataType: "json",
        type: "get",
        contentType: "aplication/json",
        success: function(result) {
			console.log(result);
			console.log(result.list);
            cards = result.list;

            loadCards();
        }
    });
});

//functions
function loadCards(){
    for (var i = 0; i < cards.length; i ++) {
		card += '<div class="row row-cols-2 card-productos col-lg-8 col-md-11 col-sm-11 col-8">' +
		            '<img src="' + cards[i].img + '" class="cardImg col-5">' +
		            '<div class="card-body col-5">' +
		                '<h4 class="card-title nombreProducto">' + cards[i].nombre + '</h4>' +
		                '<p class="card-text descripcionProducto col-12">' +
		                    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus dolorum repellendus dolore' +
		                '</p>' +
		                '<div class="precioProducto col-5">' + Math.round(cards[i].precio * 100) / 100 + ' EUR</div>' +
		            '</div>' +
		        '</div>';
        
    }
	$("#cardGroup").html($("#cardGroup").html() + card);
}