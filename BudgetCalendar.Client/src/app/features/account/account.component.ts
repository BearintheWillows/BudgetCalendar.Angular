import {Component, computed, inject, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountService} from "./account.service";
import {TableModule} from "primeng/table";
import {IAccount} from "./_interfaces/iAccount";


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  accountService = inject(AccountService);
  accounts: Signal<IAccount[]> = computed(() => this.accountService.accounts());

  ngOnInit() {
  }
}
