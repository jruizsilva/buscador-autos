import { autos } from "./db.js";

// Funciones
const iniciarApp = () => {
	llenarYear();
	mostrarAutos();
};
const mostrarAutos = (dbAutos = autos) => {
	limpiarHTML();
	const listaAutos = document.querySelector(".lista-autos");
	dbAutos.forEach((auto) => {
		const { marca, modelo, year, precio, puertas, color, transmision } = auto;
		const item = document.createElement("li");
		item.classList.add("lista-autos__li");
		const parrafo = document.createElement("p");
		parrafo.classList.add("lista-autos__paragraph");
		parrafo.textContent = `${marca} ${modelo} -
        ${year} -
        ${puertas} puertas -
        Precio: $${precio} -
        Color: ${color} -
        Transmicion: ${transmision}`;
		item.appendChild(parrafo);
		// Agrega el auto a la lista
		listaAutos.appendChild(item);
	});
};
const limpiarHTML = () => {
	const listaAutos = document.querySelector(".lista-autos");
	while (listaAutos.firstChild) {
		listaAutos.removeChild(listaAutos.firstChild);
	}
};
const llenarYear = () => {
	const selectYear = document.querySelector("select.year");
	const currentYear = new Date().getFullYear();
	const minYear = 2015;
	for (let i = minYear; i <= currentYear; i++) {
		const option = document.createElement("option");
		option.value = i;
		option.textContent = i;

		selectYear.appendChild(option);
	}
};
const filtrar = () => {
	const porMarca = (auto) => {
		if (busqueda.marca) {
			return busqueda.marca.toUpperCase() === auto.marca.toUpperCase();
		} else {
			return auto;
		}
	};
	const porYear = (auto) => {
		if (busqueda.year) {
			return Number(busqueda.year) === auto.year;
		} else {
			return auto;
		}
	};
	const porPrecioMinimo = (auto) => {
		if (busqueda.min) {
			return Number(busqueda.min) < auto.precio;
		} else {
			return auto;
		}
	};
	const porPrecioMaximo = (auto) => {
		if (busqueda.max) {
			return Number(busqueda.max) > auto.precio;
		} else {
			return auto;
		}
	};
	const porCantidadPuertas = (auto) => {
		if (busqueda.puertas) {
			return Number(busqueda.puertas) === auto.puertas;
		} else {
			return autos;
		}
	};
	const porTransmision = (auto) => {
		if (busqueda.transmision) {
			return (
				busqueda.transmision.toLowerCase() === auto.transmision.toLowerCase()
			);
		} else {
			return auto;
		}
	};
	const porColor = (auto) => {
		if (busqueda.color) {
			return busqueda.color.toLowerCase() === auto.color.toLowerCase();
		} else {
			return auto;
		}
	};
	const result = autos
		.filter(porMarca)
		.filter(porYear)
		.filter(porPrecioMinimo)
		.filter(porPrecioMaximo)
		.filter(porCantidadPuertas)
		.filter(porTransmision)
		.filter(porColor);
	mostrarAutos(result);
};
// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const min = document.querySelector("#precio-min");
const max = document.querySelector("#precio-max");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const busqueda = {
	marca: "",
	year: "",
	min: "",
	max: "",
	puertas: "",
	color: "",
	transmision: "",
};

// Eventos
const cargarEventos = () => {
	document.addEventListener("DOMContentLoaded", iniciarApp);
	marca.addEventListener("change", (e) => {
		busqueda.marca = e.target.value;
		filtrar();
	});
	year.addEventListener("change", (e) => {
		busqueda.year = e.target.value;
		filtrar();
	});
	min.addEventListener("change", (e) => {
		busqueda.min = e.target.value;
		filtrar();
	});
	max.addEventListener("change", (e) => {
		busqueda.max = e.target.value;
		filtrar();
	});
	puertas.addEventListener("change", (e) => {
		busqueda.puertas = e.target.value;
		filtrar();
	});
	color.addEventListener("change", (e) => {
		busqueda.color = e.target.value;
		filtrar();
	});
	transmision.addEventListener("change", (e) => {
		busqueda.transmision = e.target.value;
		filtrar();
	});
};

cargarEventos();
