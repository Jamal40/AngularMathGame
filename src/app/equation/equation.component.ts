import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  get leftNumber(): number {
    return this.mathForm.get('leftNumber').value;
  }

  get rightNumber(): number {
    return this.mathForm.get('rightNumber').value;
  }

  get result(): number {
    return this.mathForm.get('result').value;
  }

  secondsPerSolution: number;
  mathForm = new FormGroup(
    {
      leftNumber: new FormControl(this.randomNumber()),
      rightNumber: new FormControl(this.randomNumber()),
      result: new FormControl(''),
    },
    [MathValidators.addition('leftNumber', 'rightNumber', 'result')]
  );
  constructor() {}

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(500),
        scan(
          (acc, value) => {
            return {
              problemsSolved: acc.problemsSolved + 1,
              startTime: acc.startTime,
            };
          },
          { problemsSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ problemsSolved, startTime }) => {
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) /
          (1000 * problemsSolved);

        this.mathForm.patchValue({
          leftNumber: this.randomNumber(),
          rightNumber: this.randomNumber(),
          result: '',
        });
      });
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
}
