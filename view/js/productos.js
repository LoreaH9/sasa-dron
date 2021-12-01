//global variables
var cards, card = "";

//DOMContentLoaded
$(document).ready(getArticulos)

//functions
var swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });
function getArticulos(){
	ordenInvertido = false;

	fetch("controller/cProductos.php", {
		method: 'GET',
	})
		.then(res => res.json()).then(result => {
			cards = result.list;
			console.log(cards)
			buscar();
		})
}
function loadData(i) {
	$("#modalProducto .modalTitulo").html(cards[i].nombre);
	$("#modalProducto .modalImg1").attr('src', cards[i].img1);

	if (cards[i].img2 != null) {
		$("#modalProducto .modalImg2").attr('src', cards[i].img2);
	}
	if (cards[i].img3 != null) {
		$("#modalProducto .modalImg3").attr('src', cards[i].img3);
	}
	if (cards[i].descripcion.length > 300) {
		var descripcion = cards[i].descripcion.substring(0, 200) + "<a onclick='loadMore(" + i + ")'><b> Saber mas...</b></a>";
		$("#modalProducto .modalDescripcion").html(descripcion);
	} else {
		$("#modalProducto .modalDescripcion").html(cards[i].descripcion);
	}
	$('#modalProducto .modalPrecio').html(Math.round(cards[i].precio * 100) / 100 + "€");
}

function loadMore(i) {
	$('#modalProducto .modalDescripcion').html(cards[i].descripcion);
}

window.onload = function () {
	$("#input").val("");
}

$("#input").on("keyup", function () { buscar() })

function invertirOrden() {
	if ($("#botonInvertir").html() == "Invertir orden ▲") {
		ordenInvertido = true;
		$("#botonInvertir").html("Invertir orden ▼");
		ordenar();
	} else {
		$("#botonInvertir").html("Invertir orden ▲");
		ordenar();
	}
}

function buscar() {
	var descripcion = "";
	var found = false;
	var respuesta = $("#input").val();
	card = "";
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].nombre.toLowerCase().includes(respuesta.toLowerCase())) {
			found = true;
			if (cards[i].descripcion.length > 300) {
				descripcion = cards[i].descripcion.substring(0, 200) + "<b> ...</b>";
			} else {
				descripcion = cards[i].descripcion;
			}
			card += '<div id="' + cards[i].id + '" class="my-5 margina card-productos select" onclick="loadData(' + i + ')">' +
				'<div class="card-content">'+
				'<img src="' + cards[i].img1 + '" class="card-img">'+
				'<div class="card-cont">' +
				'<h4 class="nombreProducto">' + cards[i].nombre + '</h4>' +
				'<p class="descripcionProducto">' +
				descripcion +
				'</p>' +
				'<div class="precioProducto col-5">' + Math.round(cards[i].precio * 100) / 100 + ' €</div>' +
				'<button type="button" class=" mx-1 btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto">' +
				'Saber mas' +
				'</button>' +
				'<button type="button" class=" mx-1 btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="modalEditar(' + cards[i] + ')">' +
				'Editar' +
				'</button>' +
				'<button type="button" class=" mx-1 btn btn-danger" onclick="deleteProducto(' + cards[i].id + ')">' +
				'Borrar' +
				'</button>' +
				'</div>' +
				'</div>' +
				'</div>' +

				'</div>';
		}

	}
	if (found == false) {
		$("#cardGroup").html("<div id='notFound'> No se han encontrado drones! ＞﹏＜ </div>");
	} else {
		$("#cardGroup").html(card);
	}
}

function ordenar() {
	if ($("#orden").val() == "nombre") {
		if (ordenInvertido == false) {
			cards.sort();
			buscar();
		} else {
			cards.sort().reverse();
			buscar();
		}
	} else if ($("#orden").val() == "precio") {
		if (ordenInvertido == false) {
			cards.sort((a, b) => (a.precio < b.precio ? 1 : -1));
			buscar();
		} else {
			cards.sort().reverse();
			buscar();
		}
	}
}

function deleteProducto(id) {
	data = { 'id': id }

	fetch("controller/cProductoDelete.php", {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(res => res.json()).then(result => {
			console.log("Delete done")
			console.log(result.error);
			alert(result.error);

			getArticulos()
		})
		.catch(error => console.error('Error status:', error));
}

function modalEditar(card) {

}

$("#botonInsertar").on("click", function () {
	let nombre = $("#modalInsert .insertNombre").val();
	let precio = $("#modalInsert .insertPrecio").val();
	let img1 = $("#modalInsert .insertImg1").val();
	let img2 = $("#modalInsert .insertImg2").val();
	let img3 = $("#modalInsert .insertImg3").val();
	let descripcion = $("#modalInsert .insertDescripcion").val();

	if (nombre != "" && precio != "" && img1 != "") {
	let data = {
			"nombre": nombre, "precio": precio, "img1": img1,
			"img2": img2, "img3": img3, "descripcion": descripcion
		}

		fetch("controller/cProductoInsert.php", {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => res.json()).then(result => {
				console.log("Insert done")
				console.log(result.error);
				alert(result.error);
				getArticulos()
			})
			.catch(error => console.error('Error status:', error));
	}
})

$("#botonEditar").on("click", function () {
	let nombre = $("#modalEdit .editNombre").val();
	let precio = $("#modalEdit .editPrecio").val();
	let img1 = $("#modalEdit .editImg1").val();
	let img2 = $("#modalEdit .editImg2").val();
	let img3 = $("#modalEdit .editImg3").val();
	let descripcion = $("#modalEdit .editDescripcion").val();

	if (nombre != "" && precio != "" && img1 != "") {
	let data = {
			"nombre": nombre, "precio": precio, "img1": img1,
			"img2": img2, "img3": img3, "descripcion": descripcion
		}

		fetch("controller/cProductoInsert.php", {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => res.json()).then(result => {
				console.log("Insert done")
				console.log(result.error);
				alert(result.error);
				getArticulos()
			})
			.catch(error => console.error('Error status:', error));
	}
})
  
