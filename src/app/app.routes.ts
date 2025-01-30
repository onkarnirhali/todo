import { Routes } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';

export const routes: Routes = [
  { path: '', component: KanbanBoardComponent }, // Default route (Kanban Board)
  { path: '**', redirectTo: '' } // Redirect unknown paths
];
