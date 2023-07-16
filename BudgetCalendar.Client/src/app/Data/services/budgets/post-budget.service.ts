import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpStatusCode} from "@angular/common/http";
import {IBudgetToCreate} from "../../../features/calendar/models/iBudgetToCreate";
import {BudgetPaths} from "../../types/api/api-paths.constants";

@Injectable({
  providedIn: 'root'
})
export class PostBudgetService {
  http = inject(HttpClient);

  postBudget = (body: IBudgetToCreate) => {
    return this.http.post<HttpStatusCode>(BudgetPaths.PostBudget, body);
  }



}
