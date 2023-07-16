import {ChangeDetectionStrategy, Component, computed, inject, signal, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from "primeng/table";
import {IAccount} from "./_interfaces/iAccount";
import {ButtonModule} from "primeng/button";

import {PaginatorModule} from "primeng/paginator";
import {AddAccountComponent} from "./components/add-account/add-account.component";
import {AccountService} from "../../Data/services/calendar/account.service";


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule, AddAccountComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {

  accountService = inject(AccountService);
  accounts: Signal<IAccount[]> = computed(() => this.accountService.accounts());

  accountModels = signal<IAccount[]>([]);
  isReconcileMode: boolean = false
  addAccountDialog: boolean = false;

  ngOnInit() {
   this.accountService.getAccounts();
  }

  toggleAddAccountDialog() {
    this.addAccountDialog ? this.addAccountDialog = false : this.addAccountDialog = true;
  }




  toggleReconcileMode() {
    this.isReconcileMode = !this.isReconcileMode;
  }


  reconcileAction() {
    this.toggleReconcileMode();

    if (this.isReconcileMode) {
      this.accountModels.set(this.accounts());

    } else {
      this.accountService.accounts.set(this.accountModels());
      this.accountService.updateAccounts();
    }
  }

}
