import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import { Endpoints } from './endpoints.const';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, TabViewModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  private router = inject(Router);

  activeIndex: number = 0;

  ngOnInit(): void {

    if (this.router.url == Endpoints.login) {
      this.activeIndex = 0;
    
    }
    else if (this.router.url == '/auth/register') {
      this.activeIndex = 1;
    }

    console.log(this.activeIndex)
    
  }
}
