import {inject, Injectable} from '@angular/core';
import {ICalendarDay} from "../../../features/calendar/models/iCalendarDay";
import {HttpClient} from "@angular/common/http";
import {CalendarPaths} from "../../types/api/api-paths.constants";
import {IBudget} from "../../../features/calendar/models/iBudget";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenerateDaysService {

  http = inject(HttpClient);

  public generateDays(startDate: Date, endDate: Date, loopNum: number): Promise<ICalendarDay[]> {
    return new Promise((resolve, reject) => {
      let allDays: ICalendarDay[] = [];
      let currentDate = new Date(startDate);
      this.getCalendarBudgets(startDate, endDate).subscribe(daysWithBudgets => {

        for (let i = 0; i < loopNum  ; i++) {
          let previousDayTotal = allDays[i - 1]?.total ?? 0;
          let currentDayBudgets = daysWithBudgets.find(x => x.date.toISOString().slice(0,10) === currentDate.toISOString().slice(0, 10))?.budgets ;
          console.log(currentDate);
          let currentDay = this.createDay(currentDate, previousDayTotal, currentDayBudgets ?? null);
          console.log(currentDay)

          allDays.push(currentDay);
          console.log(allDays.length)
          console.log(allDays[0])

          currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }
        console.log(allDays);
        resolve(allDays);
      }, err => {
        reject(err);
      });
    });
  }

  public getCalendarBudgets(startDate: Date, endDate: Date): Observable<ICalendarDay[]> {
    let startD = startDate.toISOString().slice(0, 10);
    let endD = endDate.toISOString().slice(0, 10);
    return this.http.get<ICalendarDay[]>(`${CalendarPaths.DayBudgetsByRange}startDate=${startD}&endDate=${endD}`).pipe(
      map(result => {
        for (let i = 0; i < result.length; i++) {
          result[i].date = new Date(result[i].date);
        }
        return result;
      })
    );
  }

    private createDay(date: Date, previousDayTotal: number, budgets: IBudget[] | null): ICalendarDay{
      return {
        date: date,
        budgets: budgets ?? null,
        total: previousDayTotal + (budgets?.reduce((a, b) => a + b.amount, 0) ?? 0)
      };
    }


}
