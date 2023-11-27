import {Component, OnInit,OnChanges} from '@angular/core';
import {DataService} from '../data.service'
import {TableRow} from "../table-row";
import {strings} from "@material/slider";
import {catchError, forkJoin, map, Observable, of} from "rxjs";
import {Time} from "@angular/common";
import {response} from "express";
@Component({
  selector: 'app-math-challenge',
  templateUrl: './math-challenge.component.html',
  styleUrls: ['./math-challenge.component.css']
})

export class MathChallengeComponent implements OnInit {

  public tableData: TableRow[] = [];
  public inputValue: number = 0;
  public inputEquation:string=""

  public selectedLevel: string = "EasyLevel";

  public no_digits : number =1;

  public answer:boolean = false;
  public no_parameters: number = 2

  public userName :string = "";
  comment: string = '';
  submitted: boolean = false;

  public showSuccess :boolean = false;
  public showError :boolean = false
  private Submission_Time: any;

  submitComment() {

    this.submitted = true;
    this.comment = '';
  }
  constructor(private dataService: DataService) {

  }
  getParticipantsData(model: string): Observable<TableRow[]> {
    return this.dataService.getDataPart(`data/${model}`);
  }

  async submitForm() {
    this.onSubmit();
    await this.postanswer();
    this.start = false;
    this.login = false;
    this.submitAnswer();
    this.Submission_Time = new Date().toISOString().split('.')[0] + 'Z';
    this.postUser();
    //console.log(this.score);
    this.retrieveAndSortData();
  }

  startForm(){
    this.getEquations(this.selectedLevel, this.no_parameters, this.no_digits).subscribe(
      (equation: string) => {
        this.inputEquation = equation;
        this.start = true;
      },
      (error) => {
        // Handle the error if needed
        console.error('An error occurred:', error);
        this.inputEquation = "-1"; // Set a default value
      }

    );
    this.startQuiz()
    this.showSuccess = false;
  }
  onSubmit() {
    this.showSuccess =false;

  }


  getEquations(level: string, params: number, digits: number): Observable<string> {
    return this.dataService.getData(`generate_equation/${level}/${params}/${digits}/`)
      .pipe(
        map((data: any) => data.equation),
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return of("-1"); // Return a default value in case of an error
        })
      );
  }

  postUser(){
    const requestBody ={
      'Participant_Name':this.userName,
      'Submission_Time' :this.Submission_Time,
      'Score' :this.score,
      'level_params_digits':`${this.selectedLevel}-${this.no_parameters}-${this.no_digits}`,
    }
    console.log(requestBody)
    return this.dataService.postData(`data/${this.selectedLevel}/`,requestBody).subscribe(
      response =>{
        console.log(response)
      }
    )

  }
  async postanswer() {
    try {
      // Assuming this.inputValue contains 'equation' and 'user_answer'
      const requestBody = {
        equation: this.inputEquation,
        user_answer: this.inputValue,
      };

      const response = await this.dataService.postData('validate_answer/', requestBody).toPromise();

      if (response.is_correct === true) {
        this.answer = true;
        // Handle a correct answer
        console.log('Answer is correct');
      } else if (response.is_correct === false) {
        // Handle an incorrect answer
        this.answer = false;
        console.log('Answer is incorrect');
      } else {
        // Handle other responses or errors
        console.log('Response not as expected');
      }
    } catch (error) {
      // Handle HTTP error (e.g., server not reachable)
      console.error('Error:', error);
    }
  }

  onInputChange() {
    // Ensure the value is within the valid range (1 to 10)
    if (this.no_digits < 1) {
      this.no_digits = 1; // Set to the minimum value
    } else if (this.no_digits > 10) {
      this.no_digits = 10; // Set to the maximum value
    }
  }
  onInputChangepara() {
    // Ensure the value is within the valid range (1 to 10)
    if (this.no_parameters < 2) {
      this.no_parameters = 2; // Set to the minimum value
    } else if (this.no_parameters > 10) {
      this.no_parameters = 10; // Set to the maximum value
    }
  }

  checkUsername() {
    const participantName = this.userName;
    // Check if the input contains only alphanumeric characters (letters and numbers) and is not empty
    if (/^[a-zA-Z0-9]+$/.test(participantName)) {
      const requestBody={
        'participant_name' : this.userName
      }
      // Send an HTTP request to your backend API to check if the username exists
      this.dataService.postData(`check_part/`,requestBody)
        .subscribe(response=>{
          if (response.user_exists) {
            this.showSuccess = false; // Username exists
            this.login = false;
            this.showError = true;
          } else {
            this.showSuccess = true;// Username doesn't exist
            this.login = true;
            this.showError = false;
          }
        },
            error => {
          console.error(error); // Handle any errors from the API request
        });

    } else {
      // Handle the case when the input is invalid (contains non-alphanumeric characters or is empty)
      this.showSuccess = false;
      this.login = false;
      this.showError = true;
    }
  }

  login : boolean = false
  start:boolean = false;

  score: number = 5;

  // Timing variables
  maxTime: number = 10; // Maximum allowed time in seconds
  currentTime: number = 0;
  timerInterval: any;

  // Function to start the quiz and set the timer
  startQuiz() {
    this.score = 0
    this.currentTime = 0;
    this.timerInterval = setInterval(() => {
      this.currentTime++;
      if (this.currentTime === this.maxTime) {
        // Handle the case when the timer reaches the maximum time
        this.finishQuiz();
      }
    }, 1000); // Update the timer every second (1000 milliseconds)

  }

  // Function to submit the user's answer
  submitAnswer() {

    if (this.answer) {
      this.calculateScore();
    }
  }

  // Function to calculate the score based on timing
  calculateScore() {
    if (this.currentTime <= 5) {
      this.score = 10;
    } else if (this.currentTime <= 8) {
      this.score = 8;
    } else if (this.currentTime <= 10) {
      this.score = 6;
    } else if (this.currentTime <= 12) {
      this.score = 2;
    }
  }

  // Function to finish the quiz and reset the timer
  finishQuiz() {
    clearInterval(this.timerInterval);
    this.answer = false;
    this.currentTime = 0;
    this.score = 0;
  }

  retrieveAndSortData() {
    const easyData$ = this.getParticipantsData("EasyLevel");
    const mediumData$ = this.getParticipantsData("MediumLevel");
    const hardData$ = this.getParticipantsData("HardLevel");

    forkJoin([easyData$, mediumData$, hardData$]).subscribe(([easyData, mediumData, hardData]) => {
      this.tableData = easyData.concat(mediumData, hardData);
      this.sortDataByScore();
    });
  }
  sortDataByScore() {
    this.tableData.sort((a, b) => b.Score - a.Score);
  }
  ngOnInit(): void {
    this.retrieveAndSortData();
  }
}
