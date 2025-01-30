import { Task } from './tasks.model';

export interface Column {
  title: 'To-Do' | 'In-Progress' | 'Done';
  tasks: Task[];
}
