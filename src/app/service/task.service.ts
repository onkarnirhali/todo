import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Column } from '../models/column.model'; // Create this model if you haven't already

@Injectable({ providedIn: 'root' })
export class TaskService {
  private boardDocPath = 'kanban/boardData'; // Adjust the path as needed

  constructor(private firestore: Firestore) {}

  // Save the entire board data (columns and tasks) to Firestore
  async saveBoardData(columns: Column[]): Promise<void> {
    const boardDocRef = doc(this.firestore, this.boardDocPath);
    try {
      await setDoc(boardDocRef, { columns });
      console.log('Board data saved successfully.');
    } catch (error) {
      console.error('Error saving board data:', error);
      throw error;
    }
  }

  // Retrieve board data from Firestore
  async getBoardData(): Promise<Column[] | null> {
    const boardDocRef = doc(this.firestore, this.boardDocPath);
    try {
      const boardSnapshot = await getDoc(boardDocRef);
      if (boardSnapshot.exists()) {
        const data = boardSnapshot.data() as { columns: Column[] };
        return data.columns;
      } else {
        console.warn('No board data found.');
        return null;
      }
    } catch (error) {
      console.error('Error getting board data:', error);
      return null;
    }
  }
}
