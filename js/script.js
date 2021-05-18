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
		option.textContent = i;

		selectYear.appendChild(option);
	}
};
const filtrar = (e) => {
	// Funciones para filtrar
	console.log(e.target.value);
	const porMarca = (auto) =>
		auto.marca.toLowerCase() === e.target.value.toLowerCase();
	const result = autos.filter(porMarca);
	mostrarAutos(result);
};
// Variables
const marca = document.querySelector("#marca");
const filtrado = [];

// Eventos
const cargarEventos = () => {
	document.addEventListener("DOMContentLoaded", iniciarApp);
	marca.addEventListener("change", filtrar);
};

cargarEventos();
