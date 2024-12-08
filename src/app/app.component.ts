import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'todoapp';
  welcome = 'Bienvenido a mi primera aplicación de tareas';
  task = [
    'Instalar Angular CLi',
    'Crear Proyecto',
    'Crear componente',
    'Crear Servicio',
  ];

  ngOnInit(): void {
    console.log(`Entorno de publicación: ${environment.entorno} Versión: 1.0.0`);
  }
  
}
