import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayCardItemComponent } from '../day-card-item/day-card-item.component';

@Component({
  selector: 'app-day-card',
  standalone: true,
  imports: [CommonModule, DayCardItemComponent],
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent {

  title: string = 'BudgetCalendar.Client';
  budgetSections: any[] = [];
  
  @Input() dayNumber?: number;
  total: number = 0;
  previousDayTotal: number = 0;

  constructor() { }
  
    ngOnInit(): void {
      this.budgetSections = [{
        name: "Income",
        amount: -100
      }, {
        name: "Expenses",
        amount: 23
      }, {
        name: "Savings",
        amount: 10
      },
    {
      name: "Income",
      amount: -100
    },
]

  this.budgetSections.forEach(element => {
    this.total += element.amount;
  });
    }



}
