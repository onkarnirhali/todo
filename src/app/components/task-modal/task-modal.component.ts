import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<{ title: string; priority: string; dueDate: string }>();

  taskTitle = '';
  taskPriority = 'Medium';
  taskDueDate = '';

  addTask() {
    if (!this.taskTitle || !this.taskDueDate) return;

    this.taskAdded.emit({
      title: this.taskTitle,
      priority: this.taskPriority,
      dueDate: this.taskDueDate
    });

    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
