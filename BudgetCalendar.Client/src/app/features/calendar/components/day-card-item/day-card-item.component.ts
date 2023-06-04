import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-card-item.component.html',
  styleUrls: ['./day-card-item.component.scss'],
})
export class DayCardItemComponent {

  @Input() name?: string;
  @Input() amount?: number;

  constructor() { }

  ngOnInit(): void {
    //if amout is negative, then add negative class to element

  }


}
