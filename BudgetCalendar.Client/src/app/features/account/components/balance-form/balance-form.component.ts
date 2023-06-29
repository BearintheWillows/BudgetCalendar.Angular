import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-balance-form',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './balance-form.component.html',
  styleUrls: ['./balance-form.component.scss']
})
export class BalanceFormComponent {

}
