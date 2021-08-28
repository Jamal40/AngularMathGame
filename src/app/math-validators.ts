import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static addition(...args) {
    return (form) => {
      const leftNumber = form.get(args[0]).value;
      const rightNumber = form.get(args[1]).value;
      const result = form.get(args[2]).value;
      if (leftNumber + rightNumber == result) return null;
      return {
        addition: true,
      };
    };
  }

  static subtraction() {}
}
