import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ifStmt} from "@angular/compiler";

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

  logo: string = '';
  color: string = '';

  ngOnInit(): void {
    if (this.amount! >= 0) {
      this.logo = 'assets/plus-svgrepo-com.svg';
      this.color = 'green';
    } else {
      this.logo = 'assets/minus-svgrepo-com.svg';
    }
  }


  protected readonly ifStmt = ifStmt;
}
