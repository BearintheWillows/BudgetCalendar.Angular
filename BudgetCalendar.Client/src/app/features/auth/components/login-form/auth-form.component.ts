import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    PasswordModule,
    InputTextModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input() tabRoute!: string;
  form: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], ],
      password: ['', [Validators.required, Validators.minLength(6)], ],
    });

    console.log(this.tabRoute)
  
  }

  ngOnInit() {
    console.log(this.authService.isAuthenticated())
  }

  onSubmit() {
    const val = this.form.value;

    if(val.username && val.password) {
      // this.authService.login(val.email, val.password)
      //   .subscribe(
      //     () => {
      //       console.log("User is logged in");
      //       this.router.navigateByUrl('/');
      //     }
      //   );

      console.log("User is logged in");
    }


  }
}
