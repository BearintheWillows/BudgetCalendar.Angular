import {Component, computed, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-day-card-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './day-card-item.component.html',
  styleUrls: ['./day-card-item.component.scss'],
})
export class DayCardItemComponent {

  @Input() name?: string;
  @Input() amount?: number;

  logo: string = '';
  amountType = computed(() => this.amount! >= 0 ? '' : '-');

  ngOnInit(): void {
  }

}
