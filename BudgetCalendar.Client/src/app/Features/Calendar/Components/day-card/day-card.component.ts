import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {

  title: string = 'BudgetCalendar.Client';
  budgetSections: any[] = [];
  dayNumber: number = 0;

  constructor() { }
  
    ngOnInit(): void {
      this.budgetSections = [{
        name: "Income",
        amount: 0
      }, {
        name: "Expenses",
        amount: 0
      }, {
        name: "Savings",
        amount: 0
      }]
    }



}
