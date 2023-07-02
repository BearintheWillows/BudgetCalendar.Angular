import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule} from "primeng/dock";
import {Router} from "@angular/router";
import {AuthStateService} from "../../Data/services/auth-state.service";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, DockModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  authStateService = inject(AuthStateService);
  router = inject(Router);
  authState = this.authStateService.authenticationState;
  public items!: any[];
  ngOnInit() {
    this.authStateService.isUserAuthenticated();
    console.log(this.authState())
    this.items = [
      {
        label: 'Logout',
        icon: './assets/logout-svgrepo-com.svg',
        command: () => this.logout()
      },
      {
        label: 'Calendar',
        icon: `./assets/calendar/calendar-simple-${this.getDayToday()}-svgrepo-com.svg`,
        command: () => this.router.navigate(['/calendar'])
      },
      {
        label: 'Account',
        icon: './assets/bank-svgrepo-com.svg',
        command: () => this.router.navigate(['/account'])
      }
    ];

  }

  logout() {
    this.authStateService.logout();
    this.router.navigate(['/auth/login']);
  }

  getDayToday() {
    return new Date().getDate();
  }
}
