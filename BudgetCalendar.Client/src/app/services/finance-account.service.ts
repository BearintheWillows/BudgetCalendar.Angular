import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../features/account/_interfaces/iAccount";


@Injectable({
  providedIn: 'root'
})
export class FinanceAccountService {

  httpClient = inject(HttpClient);
  accounts: IAccount[] = [];


  async getAccount(): Promise<IAccount> {
    const promise = new Promise<IAccount>((resolve, reject) => {
      this.httpClient.get<IAccount>('https://localhost:44381/api/account')
        .subscribe({
          next: (data: IAccount) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
          },
          complete: () => {
            console.log('complete');
          }
        });
    });
    return promise;
  }
}
