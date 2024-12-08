import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'todoapp';
  welcome = 'Bienvenido a mi primera aplicación de tareas';
  task = [
    'Instalar Angular CLi',
    'Crear Proyecto',
    'Crear componente',
    'Crear Servicio',
  ];

  
}
