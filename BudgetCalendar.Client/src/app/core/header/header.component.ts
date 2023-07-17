import {Component, computed, inject, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {MenuItem, MessageService, SharedModule} from "primeng/api";
import {AuthService} from "../../Data/services/auth.service";
import {SidebarModule} from "primeng/sidebar";
import {ToastModule} from "primeng/toast";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, CalendarModule, SharedModule, SidebarModule, ToastModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  userName = computed(() => this.authService.userName());
  sidebarVisible = false;

  items: MenuItem[] = []
  ngOnInit(): void {
    this.items = [
      {
        label: this.userName(),
        items: [
          {
            label: 'Logout',
            command: () => {
              this.authService.logout();
              this.sidebarVisible = false;
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Logged out successfully'});
            }
          }
        ]
      }]
  }

}
