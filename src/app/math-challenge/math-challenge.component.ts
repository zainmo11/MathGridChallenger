import { Component } from '@angular/core';
import {DataService} from '../data.service'
import {equation, TableRow} from "../table-row";
@Component({
  selector: 'app-math-challenge',
  templateUrl: './math-challenge.component.html',
  styleUrls: ['./math-challenge.component.css']
})

export class MathChallengeComponent {
  public tableData: TableRow[] = [];
  public inputValue: number = 0;
  constructor(private dataService: DataService) {

  }
  getParticipantsData(model: string) {
    this.dataService.getDataPart(`data/${model}`)
      .subscribe(data => {
        this.tableData = data;
      });
  }

  onSubmit() {
    console.log(this.inputValue); // Log the input value
    // You can perform any further actions with the input value here
  }


  getEquations(level: string, params: number, digits: number) {
    this.dataService.getData(`generate_equation/${level}/${params}/${digits}/`)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          // Handle the error here
          console.error('An error occurred:', error);
        }
      );
  }


  postanswer(requestData:any) {
    this.dataService.postData('your-data-endpoint', requestData)
      .subscribe(response => {
        // Handle the response data here
      });
  }


}
