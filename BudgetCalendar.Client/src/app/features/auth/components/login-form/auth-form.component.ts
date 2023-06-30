
import { AuthStateService } from './../../../../services/auth-state.service';
import { IUserForAuthenticationDto } from 'src/app/features/auth/_interfaces/iUserForAuthentication.dto';
import { IUserForRegistration } from '../../_interfaces/iUserForRegistration.dto';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/features/auth/auth.service';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthMode } from '../../auth.constants';
import { IUserForAuthenticationResponse } from '../../_interfaces/iAuthenticationResponse.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { IRegistrationResponse } from '../../_interfaces/iRegistrationResponse.dto';
import ValidatePasswordMatch from '../../_validators/password-match.validator';
import validatePasswordMatch from '../../_validators/password-match.validator';


@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    MessageModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {

  @Input()authMode!: AuthMode;
  @Input()returnUrl: string = '';
  registerMode: boolean = true;
  form: FormGroup;



  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private authStateService: AuthStateService) {
    this.form = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
     } ],
      password: ['', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur'
      }],
      confirmPassword: ['', {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur'
      }
    ]},
    {
      validators: [validatePasswordMatch(),],
      updateOn: 'change'
    });
  }

  ngOnInit() {

    if (this.authMode === AuthMode.Login) {
      this.confirmPassword?.disable();
    }
  }

  onSubmit() {

    if (this.form.valid) {

      const val = this.form.value;

      if (this.authMode == 'login') {
      const user: IUserForAuthenticationDto = {
      email: val.email,
      password: val.password,
      }

      console.log(user);

      this.sendUserLogin(user);

    } else if (this.authMode == 'register'){
      const user: IUserForRegistration = {
        email: val.email,
        password: val.password,
        confirmPassword: val.confirmPassword,
      }

      this.sendUserRegistration(user);
    }

    }
  }

    sendUserLogin(user: IUserForAuthenticationDto){
      this.authService.login(user).subscribe((response: IUserForAuthenticationResponse) => {
        if (response.isAuthSuccessful) {

          localStorage.setItem('token', response.token || '');
          this.authStateService.sendAuthStateChange(response.isAuthSuccessful);
          this.router.navigate([this.returnUrl]);
        } else {
          console.log(response);
        }
      }
      , (error: HttpErrorResponse) => {
        console.log(error);
      });
    }

    sendUserRegistration(user: IUserForRegistration){
      this.authService.register(user).subscribe((response: IRegistrationResponse) => {
        if (response.isSuccessful) {
          this.router.navigate(['/auth/register-confirm'])
        } else {
            //handle error
          }

          console.log(response);

        }
      )}

      public get email() {
        return this.form.get('email');
      }

      public get password() {
        return this.form.get('password');
      }

      public get confirmPassword() {
        return this.form.get('confirmPassword');
      }

      public validateControl(controlName: string) {
        return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
      }

      public hasError(controlName: string, errorName: string) {
        return this.form.controls[controlName].hasError(errorName);
      }
  }

