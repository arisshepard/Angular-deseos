import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
	providedIn: 'root',
})
export class DeseosService {
	listas: Lista[] = [];

	constructor() {
		this.cargarStorage();

		// console.log('Servicio inicializado');
		// const lista1 = new Lista('Recolectar piedras del infinito');
		// const lista2 = new Lista('Heroes a desaparecer');

		// this.listas.push(lista1, lista2);
		// console.log(this.listas);
	}

	crearLista(titulo: string): number {
		const nuevaLista = new Lista(titulo);
		this.listas.push(nuevaLista);
		this.guardarStorage();

		return nuevaLista.id;
	}

	guardarStorage(): void {
		localStorage.setItem('data', JSON.stringify(this.listas));
	}

	cargarStorage(): void {
		if (localStorage.getItem('data')) {
			this.listas = JSON.parse(localStorage.getItem('data'));
		}
	}

	obtenerLista(id: string | number): Lista {
		id = Number(id);

		return this.listas.find((listaData) => listaData.id === id);
	}

	borrarLista(lista: Lista): void {
		this.listas = this.listas.filter((l) => l !== lista);
		this.guardarStorage();
	}
}
