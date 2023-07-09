import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment.development';

import {toSignal} from "@angular/core/rxjs-interop";
import {IAccount} from "../../../features/account/_interfaces/iAccount";
import {AccountPaths} from "../../types/api/api-paths.constants";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  accounts = signal<IAccount[]>([])
  totalBalance = computed(() => this.accounts()
    .filter(account => account.balance)
    .reduce((acc, account) => acc + account.balance!, 0));

  constructor() {
    this.getAccounts()

  }

  getAccounts() {
    return this.http.get(`${AccountPaths.GetAllAccounts}`)
      .subscribe((data: any) => {
        this.accounts.set(data);
      });
  }

  updateAccounts() {
    return this.http.put(`${this.baseUrl}/account/reconcile`, this.accounts())
      .subscribe((data: any) => {
        this.getAccounts();
      });

  }


  addAccount(account: IAccount): boolean {
    this.http.post(`${this.baseUrl}/account`, account)
      .subscribe((data: any) => {
        this.getAccounts();
        return true;
      });

    return false;

  }
}
