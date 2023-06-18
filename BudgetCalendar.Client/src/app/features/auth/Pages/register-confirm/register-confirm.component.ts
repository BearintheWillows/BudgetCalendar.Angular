import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { delay } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-confirm',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterConfirmComponent {

  private router = inject(Router);

  ngOnInit(){
    //set a 2 second delay
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 3500);

    
  
  }

}
