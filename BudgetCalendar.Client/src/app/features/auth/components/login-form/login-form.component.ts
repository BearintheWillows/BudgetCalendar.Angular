import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {inject} from "@angular/core/testing";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: FormGroup;


  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
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
