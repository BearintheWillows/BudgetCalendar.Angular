import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-card-item.component.html',
  styleUrls: ['./day-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayCardItemComponent {

}
