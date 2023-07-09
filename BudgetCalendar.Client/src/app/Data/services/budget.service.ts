import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBudget} from "../../features/calendar/models/iBudget";
import {IBudgetToCreate} from "../../features/calendar/models/iBudgetToCreate";
import {BudgetPaths} from "../types/api/api-paths.constants";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  httpClient = inject(HttpClient);

  postBudget = (body: IBudgetToCreate) => {
    this.httpClient.post<IBudgetToCreate>(BudgetPaths.PostBudget, body).subscribe(
      result => {
        console.log(result);
      }
    );
  }
}
