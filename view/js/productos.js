//global variables
var cards, card="";

//DOMContentLoaded
$(document).ready(function(){

	ordenNombre=document.getElementById("ordenNombre");
	ordenPrecio=document.getElementById("ordenPrecio");
	ordenUbicacion=document.getElementById("ordenUbicacion");
	ordenInvertido=false;

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
	document.getElementById("input").value = ""
  }
  
  document.getElementById("input").addEventListener("keyup", function () { buscar() })
  
  function invertirOrden(){
	if (ordenInvertido==false) {
	  ordenInvertido=true;
	  document.getElementById("botonInvertir").innerHTML="Invertir orden ▼"
	} else{
	  ordenInvertido=false;
	  document.getElementById("botonInvertir").innerHTML="Invertir orden ▲"
	}
	ordenar();
  }
  
  function buscar() {
	var notFound = false;
	var respuesta = document.getElementById("input").value;
	document.getElementById("cardGroup").innerHTML = "";
	for (let i = 0; i < hoteles.length; i++) {
	  if (hoteles[i][0].toLowerCase().includes(respuesta.toLowerCase())) {
		notFound = true
		document.getElementById("cardGroup").innerHTML += `
				  <div class="card card-alojamiento col-lg-3 col-md-5 col-sm-8 col-8">
					<a href="" class="cardTop ">
					  <img src="`+ (hoteles[i][4]) + `" class="card-img-top">
					  <p class="cardButton">Boton</p>
					</a>
					<div class="card-body">
					  <h4 class="card-title nombreHotel">`+ (hoteles[i][0]) + `</h4>
					  <p class="card-text descripcionHotel">
						`+ (hoteles[i][1]) + `
					  </p>
					  <p class="ubicacionHotel">
						`+ (hoteles[i][2]) + `
					  </p>
					  <p class="precioHotel">
						`+ (hoteles[i][3]) + `
					  </p>
					</div>
				  </div>`;
	  }
	}
	if (notFound == false) {
		document.getElementById("cardGroup").innerHTML += "<div id='notFound'> No se han encontrado hoteles! ＞﹏＜ </div>";
	  }
  }
  
  function ordenar(){
	  console.log("Ordenar")
  
	if (ordenNombre.selected == true) {
		console.log("nombre seleccionado")
	  if (ordenInvertido==false) {
		hoteles.sort();
	  } else {
		hoteles.sort().reverse();
	  }
	  buscar();
	} else if(ordenPrecio.selected == true){
  
	  console.log("precio seleccionado")
	  hoteles.sort(function(a, b){
		if (ordenInvertido==false) {
		  return parseInt(a[3]) - parseInt(b[3])
		} else {
		  return parseInt(a[3]) < parseInt(b[3])
		}
	  })
		console.log(hoteles)
	  buscar();
	  
	} else if (ordenUbicacion.selected == true){
		console.log("ubicacion seleccionado")
  
	  hoteles.sort(function(a, b){
		if (ordenInvertido==false) {
		  return a[2] > b[2]
		} else {
		  return a[2] < b[2]
		}
	  })
	  buscar();
	}
  }