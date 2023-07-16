import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBudget} from "../../../features/calendar/models/iBudget";
import {BudgetPaths} from "../../types/api/api-paths.constants";
import {IHttpResponse} from "../../types/http/iHttpResponse";

@Injectable({
  providedIn: 'root'
})
export class GetBudgetService {
  http = inject(HttpClient);


  getBudgetsByRange = (startDate: Date, endDate: Date) => {
    let startD = startDate.toISOString().slice(0, 10);
    let endD = endDate.toISOString().slice(0, 10);
    return this.http.get<IHttpResponse>(`${BudgetPaths.GetBudgetsByRange}startDate=${startD}&endDate=${endD}`);
  }
}
