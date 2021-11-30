//global variables
var cards, card="";

//DOMContentLoaded
$(document).ready(function(){
	ordenInvertido=false;

	fetch("controller/cProductos.php",{
		method: 'GET',
		})
		.then(res => res.json()).then(result => {
			cards = result.list;

			buscar();
		})			
});

//functions
function loadCards(){
    for (var i = 0; i < cards.length; i ++) {
		if(cards[i].descripcion.length>300){
			var descripcion = cards[i].descripcion.substring(0,200) + "<b> ...</b>";
		}else{
			var descripcion = cards[i].descripcion;
		}
		card += '<div class="row row-cols-2 card-productos col-lg-5 col-md-11 col-sm-11 col-8 select" onclick="loadData('+i+')">' +
		            '<a><img src="' + cards[i].img1 + '" class="cardImg col-3" > </a>' +
		            '<div class="card-body col-5">' +
		                '<h4 class="card-title nombreProducto">' + cards[i].nombre + '</h4>' +
		                '<p class="card-text descripcionProducto col-12">' +
		                    descripcion +
		                '</p>' +
		                '<div class="precioProducto col-5">' + Math.round(cards[i].precio * 100) / 100 + ' €</div>' +
						'<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto">' +
					'Saber mas' +
					'</button>' +
		            '</div>' +
		        '</div>';
    }
	$("#cardGroup").html(card);
}

function loadData(i){
	$("#modalTitulo").html(cards[i].nombre);
	$("#modalImg1").attr('src', cards[i].img1);
	if(cards[i].img2 != null){
		$("#modalImg2").attr('src', cards[i].img2);
	}
	if(cards[i].img3 != null){
		$("#modalImg3").attr('src', cards[i].img3);
	}
	if(cards[i].descripcion.length>300){
		var descripcion = cards[i].descripcion.substring(0,200) + "<a onclick='loadMore("+i+")'><b> Saber mas...</b></a>";
		$("#modalDescripcion").html(descripcion );
	}else{
		$("#modalDescripcion").html(cards[i].descripcion );
	}
	$('#modalPrecio').html(Math.round(cards[i].precio * 100) / 100 + "€");
}

function loadMore(i){
	$('#modalDescripcion').html(cards[i].descripcion);
}

$('#modalDescripcion').on('dblclick', function(){
	$('#modalDescripcion').html()
})

 
  window.onload = function () {
	$("#input").val("");
  }
  
  $("#input").on("keyup", function () { buscar() })
  
  function invertirOrden(){
	if ($("#botonInvertir").html() == "Invertir orden ▲") {
	  ordenInvertido=true;
	  $("#botonInvertir").html("Invertir orden ▼");
	  ordenar();
	} else{
	  $("#botonInvertir").html("Invertir orden ▲");
	  ordenar();
	}
  }
  
  function buscar() {
	var descripcion = "";
	var found = false;
	var respuesta = $("#input").val();
	card = "";
	for (var i = 0; i < cards.length; i ++) {
		if (cards[i].nombre.toLowerCase().includes(respuesta.toLowerCase())) {
			found = true;
			if(cards[i].descripcion.length>300){
				descripcion = cards[i].descripcion.substring(0,200) + "<b> ...</b>";
			}else{
				descripcion = cards[i].descripcion;
			}
			card += '<div class="row row-cols-2 card-productos col-lg-5 col-md-11 col-sm-11 col-8 select" onclick="loadData('+i+')">' +
						'<a><img src="' + cards[i].img1 + '" class="cardImg col-3" > </a>' +
						'<div class="card-body col-5">' +
							'<h4 class="card-title nombreProducto">' + cards[i].nombre + '</h4>' +
							'<p class="card-text descripcionProducto col-12">' +
								descripcion +
							'</p>' +
							'<div class="precioProducto col-5">' + Math.round(cards[i].precio * 100) / 100 + ' €</div>' +
							'<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto">' +
						'Saber mas' +
						'</button>' +
						'</div>' +
					'</div>';
		} 
		
    }
	if(found == false) {
		$("#cardGroup").html("<div id='notFound'> No se han encontrado drones! ＞﹏＜ </div>");
	}else{
		$("#cardGroup").html(card);
	}
  }
  
  function ordenar(){ 
	if ($("#orden").val() == "nombre") {
	  if (ordenInvertido==false) {
		cards.sort();
		buscar();
	  } else {
		cards.sort().reverse();
		buscar();
	  }
	} else if($("#orden").val() == "precio"){
		if (ordenInvertido==false) {
			cards.sort((a, b) => (a.precio < b.precio ? 1: -1));
			buscar();
		  } else {
			cards.sort().reverse();
			buscar();
		  }
	}
  }