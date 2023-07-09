import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {IAccount} from "../../_interfaces/iAccount";
import {AccountService} from "../../../../Data/services/calendar/account.service";

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule, RippleModule],
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent {


  fb = inject(FormBuilder);
  router = inject(Router);
  accountService = inject(AccountService);
  loading: boolean = false;

  visible: boolean = true;

  form: FormGroup = this.fb.group({
    name: ['',
      {
        validators: [Validators.required],
      }],
    balance: ['',
      {
        validators: [Validators.required],
      }],
  });

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }


  onSubmit() {
    const account: IAccount = {
      id: 0,
      name: this.form.value.name,
      balance: this.form.value.balance,
    }

    this.accountService.addAccount(account);
    this.visible = false;
    this.router.navigate(['/account']);

  }



}
