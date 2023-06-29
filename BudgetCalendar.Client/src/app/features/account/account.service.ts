import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import {IAccount} from "./_interfaces/iAccount";
import {toSignal} from "@angular/core/rxjs-interop";

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
    return this.http.get(`${this.baseUrl}/account`)
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
}
