import {Component, computed, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {IBudget} from "../../models/iBudget";


@Component({
  selector: 'app-day-card-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './day-card-item.component.html',
  styleUrls: ['./day-card-item.component.scss'],
})
export class DayCardItemComponent {

  @Input() budget?: IBudget | null;


  amountType = computed(() => this.budget?.amount! >= 0 ? '' : '-');



}
