import { Component } from '@angular/core';

@Component({
  selector: 'app-sudoko-problem',
  templateUrl: './sudoko-problem.component.html',
  styleUrls: ['./sudoko-problem.component.css']
})
export class SudokoProblemComponent {
  sudoku: any[][]; // Define your Sudoku grid structure here

  constructor() {
    // Initialize the Sudoku grid as an empty 9x9 array
    this.sudoku = Array(9).fill(null).map(() => Array(9).fill({ value: null, notes: [] }));
  }

  addingNotes: boolean = false; // Initialize as false

  toggleNotes() {
    this.addingNotes = !this.addingNotes;
  }

  onFieldClick(field: any) {
    if (this.addingNotes) {
      // Implement logic to add or remove notes from the clicked cell
      // For example:
      if (field.notes.includes("1")) {
        field.notes = field.notes.filter((note: string) => note !== "1");
      } else {
        field.notes.push("1");
      }
    } else {
      // Implement logic to set the value of the clicked cell
      // For example:
      field.value = 1;
    }
  }

}
