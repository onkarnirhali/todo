import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule], // ✅ Ensure DragDropModule is imported
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  columns = [
    { title: 'To-Do', tasks: [{ id: 1, title: 'Create UI', priority: 'High' }] },
    { title: 'In-Progress', tasks: [{ id: 2, title: 'Implement Drag & Drop', priority: 'Medium' }] },
    { title: 'Done', tasks: [{ id: 3, title: 'Deploy App', priority: 'Low' }] }
  ];

  /** Handles Drag & Drop */
  drop(event: CdkDragDrop<any[]>) {
    console.log("Drag Event:", event);

    if (!event.previousContainer || !event.container) {
      console.warn("Drop event missing containers!");
      return;
    }

    console.log(`Moving from: ${event.previousContainer.id} to ${event.container.id}`);

    if (event.previousContainer === event.container) {
      console.log("Reordering within the same column.");
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.isPointerOverContainer) {
      console.log("Transferring to a new column.");
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // ✅ Ensure the task's status is updated to the new column
      const movedTask = event.container.data[event.currentIndex];
      const newColumn = this.columns.find(col => col.tasks === event.container.data);
      if (newColumn) {
        movedTask.status = newColumn.title;
      }
    } else {
      console.warn("Drop failed: Task was not detected inside a valid column.");
    }
  }
}
