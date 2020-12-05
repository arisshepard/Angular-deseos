import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { ListaItem } from '../../models/lista-item.model';

@Component({
	selector: 'app-agregar',
	templateUrl: './agregar.page.html',
	styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
	lista: Lista;
	nombreItem: string;

	constructor(
		private deseosService: DeseosService,
		private route: ActivatedRoute
	) {
		const listaId = this.route.snapshot.paramMap.get('id');
		this.lista = this.deseosService.obtenerLista(listaId);
	}

	ngOnInit() {}

	agregarItem() {
		if (this.nombreItem.length === 0) {
			return;
		} else {
			const nuevoItem = new ListaItem(this.nombreItem);
			this.lista.items.push(nuevoItem);

			this.nombreItem = '';
			this.deseosService.guardarStorage();
		}
	}

	cambioCheck(item: ListaItem) {
		// console.log(item);

		const pendientes = this.lista.items.filter(
			(itemData) => !itemData.completado
		).length;

		// console.log({ pendientes });

		if (pendientes === 0) {
			this.lista.terminadaEn = new Date();
			this.lista.completada = true;
		} else {
			this.lista.terminadaEn = null;
			this.lista.completada = false;
		}

		this.deseosService.guardarStorage();
	}

	eliminarItem(index: number): void {
		// const index = this.lista.items.indexOf(item);

		// console.log(index);

		this.lista.items.splice(index, 1);

		this.deseosService.guardarStorage();
	}
}
