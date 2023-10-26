import {Component, OnInit,} from '@angular/core';
import {DataService} from '../data.service'
import {TableRow} from "../table-row";
import {strings} from "@material/slider";
import {catchError, map, Observable, of} from "rxjs";
@Component({
  selector: 'app-math-challenge',
  templateUrl: './math-challenge.component.html',
  styleUrls: ['./math-challenge.component.css']
})

export class MathChallengeComponent  {

  public tableData: TableRow[] = [];
  public inputValue: number = 0;
  public inputEquation:string=""

  public selectedLevel: string = "";

  public no_digits : number =1;

  public answer:boolean = false;
  public no_parameters: number = 1

  public userName :string = "";
  comment: string = '';
  submitted: boolean = false;

  public showSuccess :boolean = false;
  public showError :boolean = false

  submitComment() {

    this.submitted = true;
    this.comment = '';
  }
  constructor(private dataService: DataService) {

  }
  getParticipantsData(model: string) {
    this.dataService.getDataPart(`data/${model}`)
      .subscribe(data => {
        this.tableData = data;
      });
  }

  submitForm() {
    this.onSubmit();
    this.postanswer();
    console.log(this.score);
    this.submitAnswer();
    console.log(this.score);
    this.finishQuiz();
    this.getParticipantsData(this.selectedLevel);
    this.start = true;
  }

  startForm(){
    this.getEquations(this.selectedLevel, this.no_parameters, this.no_digits).subscribe(
      (equation: string) => {
        this.inputEquation = equation;
      },
      (error) => {
        // Handle the error if needed
        console.error('An error occurred:', error);
        this.inputEquation = "-1"; // Set a default value
      }

    );
    this.startQuiz()
  }
  onSubmit() {
    console.log(this.inputValue); // Log the input value
    // You can perform any further actions with the input value here
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


  postanswer() {
    // Assuming this.inputValue contains 'equation' and 'user_answer'
    const requestBody = {
      equation: this.inputEquation,
      user_answer: this.inputValue
    };

    this.dataService.postData('validate_answer/', requestBody)
      .subscribe(response => {
          if (response.is_correct === true) {
            this.answer = true
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
        },
        error => {
          // Handle HTTP error (e.g., server not reachable)
          console.error('Error:', error);
        });
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
            this.showError = true;
            this.start = false
          } else {
            this.showSuccess = true; // Username doesn't exist
            this.showError = false;
          }
        },
            error => {
          console.error(error); // Handle any errors from the API request
        });

    } else {
      // Handle the case when the input is invalid (contains non-alphanumeric characters or is empty)
      this.showSuccess = false;
      this.showError = true;
    }
  }


  start:boolean = true;

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
    if (this.currentTime <= 3) {
      this.score = 10;
    } else if (this.currentTime <= 6) {
      this.score = 8;
    } else if (this.currentTime <= 8) {
      this.score = 6;
    } else if (this.currentTime <= 10) {
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
}
