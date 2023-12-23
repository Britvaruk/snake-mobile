import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, SegmentCustomEvent } from '@ionic/angular';
import { LoginMode } from './interfaces/login-mode.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage {
  selectedMode: LoginMode = LoginMode.SignIn;
  loginModeEnum = LoginMode;

  loginForm: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  regForm: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  changeMode(event: SegmentCustomEvent): void {
    this.selectedMode = event.detail.value as LoginMode;
  }

  login(): void {
    this.router.navigate(['/tabs']);
  }

  ionViewWillLeave(): void {
    this.loginForm.reset();
    this.regForm.reset();
  }
}
