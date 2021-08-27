import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';

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
    this.mathForm.statusChanges.subscribe((value) => {
      if (value === 'INVALID') {
        return;
      }

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
