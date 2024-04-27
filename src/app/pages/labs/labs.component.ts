import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicación de tareas';
  task = [
    'Instalar Angular CLi',
    'Crear Proyecto',
    'Crear componente',
    'Crear Servicio',
  ];
}
