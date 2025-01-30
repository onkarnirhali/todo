export interface Task {
    id: number;
    title: string;
    status: 'To-Do' | 'In-Progress' | 'Done';
    priority: 'High' | 'Medium' | 'Low';
  }
  