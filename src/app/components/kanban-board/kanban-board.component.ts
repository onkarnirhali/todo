import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../service/task.service'; // Adjust the path as needed
import { Column } from '../../models/column.model';        // Importing Column interface
import { Task } from '../../models/tasks.model';           // Importing Task interface
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskModalComponent], // Import modal
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  columns: Column[] = [];
  modalOpen = false; // Control modal visibility

  constructor(private taskService: TaskService) {}

  async ngOnInit(): Promise<void> {
    try {
      const boardData = await this.taskService.getBoardData();
      if (boardData) {
        this.columns = boardData;
      } else {
        this.columns = [
          { title: 'To-Do', tasks: [] },
          { title: 'In-Progress', tasks: [] },
          { title: 'Done', tasks: [] }
        ];
        await this.taskService.saveBoardData(this.columns);
      }
    } catch (error) {
      console.error('Error retrieving board data from Firestore:', error);
    }
  }

  async drop(event: CdkDragDrop<Task[]>): Promise<void> {
    if (!event.previousContainer || !event.container) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.isPointerOverContainer) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedTask = event.container.data[event.currentIndex];
      const newColumn = this.columns.find(col => col.tasks === event.container.data);
      if (newColumn) {
        movedTask.status = newColumn.title;
      }
    }

    try {
      await this.taskService.saveBoardData(this.columns);
    } catch (error) {
      console.error('Error saving board data to Firestore:', error);
    }
  }

  /** Opens the Add Task Modal */
  openModal() {
    this.modalOpen = true;
  }

  /** Handles adding a task from the modal */
  async addTask(task: { title: string; priority: string; dueDate: string }) {
    const newTask: Task = {
      id: Date.now(),
      title: task.title,
      priority: task.priority as 'High' | 'Medium' | 'Low',
      dueDate: task.dueDate,
      status: 'To-Do'  // ✅ Default status
    };

    const toDoColumn = this.columns.find(col => col.title === 'To-Do');
    if (toDoColumn) {
      toDoColumn.tasks.push(newTask);
      try {
        await this.taskService.saveBoardData(this.columns);
      } catch (error) {
        console.error('Error saving task to Firestore:', error);
      }
    }
    
    this.modalOpen = false; // Close modal after task is added
  }
}
