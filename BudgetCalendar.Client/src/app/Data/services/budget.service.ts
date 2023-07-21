import {inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBudget} from "../../features/calendar/models/iBudget";
import {IBudgetToCreate} from "../../features/calendar/models/iBudgetToCreate";
import {BudgetPaths} from "../types/api/api-paths.constants";
import {PostBudgetService} from "./budgets/post-budget.service";
import {GetBudgetService} from "./budgets/get-budget.service";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  postBudgetService = inject(PostBudgetService);
  getBudgetService = inject(GetBudgetService);

  budgets= signal<IBudget[]>([]);

  postBudget = (body: IBudgetToCreate) => {
    this.postBudgetService.postBudget(body).subscribe( result => {
      if (result === 201) {
        console.log('Budget created successfully');
      }
    } );
  }

  getBudgetsByRange = (startDate: Date, endDate: Date) => {
    this.getBudgetService.getBudgetsByRange(startDate, endDate).subscribe( result => {
      console.log(result)
      this.budgets.mutate(items => items.push(...result.sort((a, b) => a.date > b.date ? 1 : -1)));
      console.log(this.budgets())
    } );
  }
}
