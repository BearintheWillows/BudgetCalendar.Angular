import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [CommonModule, ButtonModule, CalendarModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
