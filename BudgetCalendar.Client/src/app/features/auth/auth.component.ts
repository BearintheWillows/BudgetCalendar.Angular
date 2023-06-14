import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import { Endpoints } from './endpoints.const';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { AuthFormComponent } from "./components/login-form/auth-form.component";
import { MenuItem } from 'primeng/api';
@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    imports: [CommonModule, TabMenuModule, CardModule, AuthFormComponent]
})
export class AuthComponent {
  tabMenuItems!: MenuItem[];
  activeItem!: MenuItem;

  private router = inject(Router);

  ngOnInit(): void {
    this.tabMenuItems = [
      {label: 'Login', icon: 'pi pi-fw pi-user', routerLink: Endpoints.login},
      {label: 'Register', icon: 'pi pi-fw pi-user-plus', routerLink: Endpoints.register}
  ];

  this.activeItem = this.tabMenuItems[0];
}


  onActiveItemChange(event: MenuItem){
    this.activeItem = event;
}

  activateLast() {
    this.activeItem = this.tabMenuItems[this.tabMenuItems.length - 1];
}

}

