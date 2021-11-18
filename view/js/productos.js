//global variables
var cards, card="";

//DOMContentLoaded
$(document).ready(function(){

	fetch("controller/cProductos.php",{
		method: 'GET',
		})
		.then(res => res.json()).then(result => {
			console.log(result.list)
			cards = result.list;

			loadCards();
		})			
});

//functions
function loadCards(){
    for (var i = 0; i < cards.length; i ++) {
		card += '<div class="row row-cols-2 card-productos col-lg-8 col-md-11 col-sm-11 col-8 select" onclick="loadData('+i+')" data-bs-toogle="modal" data-bs-target="#modalProducto">' +
		            '<img src="' + cards[i].img1 + '" class="cardImg col-5" > ' +
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

function loadData(i){
	$("#modalTitulo").html(cards[i].nombre);
	$("#modalImg1").src(cards[i].img1);
	$("#modalImg2").src(cards[i].img2);
	$("#modalImg3").src(cards[i].img3);
	$("modalDescripcion").html(cards[i].descripcion);
}