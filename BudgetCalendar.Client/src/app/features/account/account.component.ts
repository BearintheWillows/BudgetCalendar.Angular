import {ChangeDetectionStrategy, Component, computed, inject, signal, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountService} from "./account.service";
import {TableModule} from "primeng/table";
import {IAccount} from "./_interfaces/iAccount";
import {ButtonModule} from "primeng/button";
import {BalanceFormComponent} from "./components/balance-form/balance-form.component";
import {PaginatorModule} from "primeng/paginator";


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, BalanceFormComponent, PaginatorModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {

  accountService = inject(AccountService);
  accounts: Signal<IAccount[]> = computed(() => this.accountService.accounts());

  accountModels = signal<IAccount[]>([]);
  isReconcileMode: boolean = false

  ngOnInit() {
   this.accountService.getAccounts();
   console.log(this.accounts())
  }





  toggleReconcileMode() {
    this.isReconcileMode = !this.isReconcileMode;
  }


  reconcileAction() {
    this.toggleReconcileMode();
    console.log(this.accounts())

    if (this.isReconcileMode) {
      this.accountModels.set(this.accounts());
      console.log(this.accountModels())

    } else {
      this.accountService.accounts.set(this.accountModels());
      this.accountService.updateAccounts();
    }
  }
}
