import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionTypeColor',
  standalone: true
})
export class TransactionTypeColorPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "Income":
        return "green";
      case "Expense":
        return "red";
      default:
        return "black";

    }
  }
}
