import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {inject} from "@angular/core/testing";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatTooltipModule, MatButtonModule, MatInputModule, MatCardModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], ],
      password: ['', [Validators.required, Validators.minLength(6)], ],
    });
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
