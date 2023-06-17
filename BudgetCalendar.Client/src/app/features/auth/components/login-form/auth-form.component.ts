import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthMode } from '../../auth.constants';
import { IUserForAuthenticationDto } from '../../_models/iUserForAuthenticationDto';
import { IUserForAuthenticationResponse } from '../../_models/iUserForAuthenticationResponse';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    RippleModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {

  @Input()authMode!: AuthMode;
  @Input()returnUrl: string = '';
  registerMode: boolean = true;
  form: FormGroup;
  


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], ],
      password: ['', [Validators.required, Validators.minLength(6)], ],
      confirmPassword: ['', [Validators.required, Validators.minLength(6),], ],
    });
  }

  ngOnInit() {

    if (this.authMode === AuthMode.Login) {
      this.form.removeControl('confirmPassword');
    }

    console.log(this.returnUrl);
    console.log(this.authMode);
  }

  onSubmit() {

    if (this.form.valid) {
      const val = this.form.value;
      const user: IUserForAuthenticationDto = {
        email: val.email,
        password: val.password
      };

      this.authService.login(user).subscribe((response: IUserForAuthenticationResponse) => {
        if (response.isAuthSuccessful) {
          localStorage.setItem('token', response.token || '');
          this.router.navigate([this.returnUrl]);
        } else {
          this.form.setErrors({
            'auth': response.errorMessage
          });
        }
      }
      , (error: HttpErrorResponse) => {
        console.log(error);
      }
      );
    }
  }
}

