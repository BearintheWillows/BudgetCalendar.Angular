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

    console.log(this.authMode);
  }

  onSubmit() {
    const val = this.form.value;

    console.log(val);
    


  }
}
