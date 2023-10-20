import {Component, NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-sudoko',
  templateUrl: './sudoko.component.html',
  styleUrls: ['./sudoko.component.css']
})

export class SudokoComponent {
  sudokuGrid: number[][]; // Initialize this with your Sudoku grid data
  size: number = 9; // Change this to the size of your Sudoku grid (e.g., 9x9)

  constructor() {
    // Initialize your Sudoku grid data
    this.sudokuGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],]}
}
