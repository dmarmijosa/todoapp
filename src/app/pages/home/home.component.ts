import {
  Component,
  Injector,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Task } from '../interfaces/task.interface';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AllowLetterNumberSpacesDirective } from '../../directives/allow-letter-number-spaces.directive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, AllowLetterNumberSpacesDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  entorno = environment.entorno;
  injector = inject(Injector);
  tasks = signal<Task[]>([]);
  filter = signal<'pending' | 'all' | 'completed'>('all');
  taskByFilter = computed<Task[]>((): Task[] => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.complete);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.complete);
    }
    return tasks;
  });

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }
  // Alternativa a usar el constructor
  trackTask() {
    effect(
      () => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const tasksLocalStorage = localStorage.getItem('tasks');
    if (tasksLocalStorage) {
      this.tasks.set(JSON.parse(tasksLocalStorage));
    } else {
      this.tasks.set([]);
    }
  }

  newsTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ],
  });

  editTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ],
  });
  changeHandle() {
    if (this.newsTaskCtrl.invalid) return;
    const value = this.newsTaskCtrl.value;
    this.addTask(value);
    this.newsTaskCtrl.setValue('');
    // const input = event.target as HTMLInputElement;
    // const newTask = input.value;
    // this.addTask(newTask);
    // input.value = '';
  }
  addTask(title: string) {
    const newTask: Task = {
      id: Date.now() * Math.floor(Math.random() * 100),
      title: title,
      complete: false,
    };
    this.tasks.update((task) => [...task, newTask]);
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((_, position) => position != id));
  }

  updateTaks(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            complete: !task.complete,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'pending' | 'all' | 'completed') {
    this.filter.set(filter);
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  updateTaskText(index: number, event: Event) {
    
    if(this.tasks()[index].complete) return;
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          if(input.value.trim().length===0){
            return {
              ...task,
              editing: false,
            };
          };
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });

    });
    console.log(this.tasks());
  }
}
