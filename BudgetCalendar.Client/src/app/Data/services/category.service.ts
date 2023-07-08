import {inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryPaths} from "../types/api/api-paths.constants";
import {ICategory} from "../../features/calendar/models/iCategory";
import {IHttpResponse} from "../types/http/iHttpResponse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpClient = inject(HttpClient);

  categories = signal<ICategory[]>([]);


  public getCategories(): void {
     this.httpClient.get<ICategory[]>(`${CategoryPaths.GetAllCategories}`).subscribe(result => {
      console.log(result)
       this.categories.mutate(value => value.push(...result));
      console.log(this.categories());
    });
  }
}
