import { Component } from '@angular/core';
import { Task } from '../../models/tasks.model';
import { Column } from '../../models/column.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  columns: Column[] = [
    { title: 'To-Do', tasks: [] },
    { title: 'In-Progress', tasks: [] },
    { title: 'Done', tasks: [] }
  ];

  addTask(title: string, priority: 'High' | 'Medium' | 'Low', status: 'To-Do' | 'In-Progress' | 'Done') {
    const newTask: Task = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      status,
      priority
    };

    const column = this.columns.find(col => col.title === status);
    column?.tasks.push(newTask);
  }
}
