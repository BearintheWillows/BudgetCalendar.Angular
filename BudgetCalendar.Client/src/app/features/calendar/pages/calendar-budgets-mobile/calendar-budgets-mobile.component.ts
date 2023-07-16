import {Component, computed, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {BudgetService} from "../../../../Data/services/budget.service";

@Component({
  selector: 'app-calendar-budgets-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-budgets-mobile.component.html',
  styleUrls: ['./calendar-budgets-mobile.component.scss']
})
export class CalendarBudgetsMobileComponent {

  budgetService = inject(BudgetService)
  router = inject(Router);
  route = inject(ActivatedRoute);

  date: Date = new Date();
  budgets = computed(() => this.budgetService.budgets());

  ngOnInit(): void {

    this.budgetService.getBudgetsByRange(new Date(2023, 6, 1), new Date(2023, 6, 31));

    this.route.paramMap.subscribe(params => {
      let date = params.get('date');
      if (date) {
        this.date = new Date(date);
      }
    });

    console.log(this.budgets());




  }

}
