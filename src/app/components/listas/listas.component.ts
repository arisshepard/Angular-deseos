import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
	selector: 'app-listas',
	templateUrl: './listas.component.html',
	styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
	@ViewChild(IonList) lista: IonList;

	@Input() public terminada = true;

	// nombreLista: string;

	constructor(
		public deseosService: DeseosService,
		private route: Router,
		private alertController: AlertController
	) {}

	ngOnInit(): void {}

	editarLista(lista: Lista): void {
		if (this.terminada) {
			this.route.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
		} else {
			this.route.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
		}
	}

	borrarLista(lista: Lista): void {
		this.deseosService.borrarLista(lista);
	}

	private editarNombreLista(lista: Lista, nuevoTitulo: string): void {
		if (nuevoTitulo.length === 0) {
			return;
		} else {
			// const index = this.deseosService.listas.indexOf(lista);

			// this.deseosService.listas[index].titulo = nuevoTitulo;

			lista.titulo = nuevoTitulo;

			// this.nombreLista = '';
			this.deseosService.guardarStorage();
		}
	}
	async editarNombre(lista: Lista): Promise<void> {
		const alert = await this.alertController.create({
			// cssClass: 'my-custom-class',
			header: 'Editar nombre',
			inputs: [
				{
					name: 'titulo',
					type: 'text',
					value: lista.titulo,
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
						this.lista.closeSlidingItems();
					},
				},
				{
					text: 'Aceptar',
					handler: (datos) => {
						// console.log(datos.titulo);

						this.editarNombreLista(lista, datos.titulo);
						this.lista.closeSlidingItems();
					},
				},
			],
		});

		await alert.present();
	}
}
