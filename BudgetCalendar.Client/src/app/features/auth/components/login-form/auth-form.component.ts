
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
     
      if (this.authMode == 'login') {
      const user: IUserForAuthenticationDto = {
      email: val.email,
      password: val.password,
      }
      
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
        if (response.isSuccessful) {
          localStorage.setItem('token', response.token || '');
          this.authStateService.sendAuthStateChange(response.isSuccessful);
          this.router.navigate([this.returnUrl]);
        } else {
          this.form.setErrors({
            'auth': response.errorMessage
          });
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
        return this.form.controls[controlName].invalid && this.form.controls[controlName].dirty;
      }
    
      public hasError(controlName: string, errorName: string) {
        return this.form.controls[controlName].hasError(errorName);
      }
  }

