import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MathChallengeComponent} from "./math-challenge/math-challenge.component";
import {SudokoProblemComponent} from "./sudoko-problem/sudoko-problem.component";

import {AppLayoutComponent} from "./app-layout/app-layout.component";
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent, // Use the layout component
    children: [
      { path: '', component: HomeComponent },
      { path: 'Equation_game', component: MathChallengeComponent },
      { path: 'Sudoku_game', component: SudokoProblemComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

