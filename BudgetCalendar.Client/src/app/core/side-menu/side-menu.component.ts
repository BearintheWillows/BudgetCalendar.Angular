import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule} from "primeng/dock";
import {AuthService} from "../../features/auth/auth.service";
import {Router} from "@angular/router";
import {AuthStateService} from "../../services/auth-state.service";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, DockModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  authService = inject(AuthService);
  authStateService = inject(AuthStateService);
  router = inject(Router);
  authState = this.authStateService.authenticationState;
  public items!: any[];

  constructor() {
  }

  ngOnInit() {
    this.authStateService.isUserAuthenticated();
    this.items = [
      {
        label: 'Logout',
        icon: './assets/logout-svgrepo-com.svg',
        command: () => this.logout()
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
