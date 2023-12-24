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
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { matchValidator } from 'src/app/core/validators/confirm-password.validator';
import { UserService } from 'src/app/core/services/user/user.service';

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
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  regForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: [
      '',
      [Validators.required, matchValidator('confirmPassword', true)],
    ],
    confirm_password: ['', [Validators.required, matchValidator('password')]],
  });

  isAlertOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  changeMode(event: SegmentCustomEvent): void {
    this.selectedMode = event.detail.value as LoginMode;
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.accessToken);
        this.userService.getUser().then(() => this.router.navigate(['/tabs']));
      },
      error: () => {
        this.setAlertOpen(true);
        this.resetForms();
      },
    });
  }

  registration(): void {
    delete this.regForm.value.confirm_password;

    this.authService.registration(this.regForm.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.accessToken);
        this.userService.getUser().then(() => this.router.navigate(['/tabs']));
      },
      error: () => {
        this.resetForms();
      },
    });
  }

  resetForms(): void {
    this.loginForm.reset();
    this.regForm.reset();
  }

  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  ionViewWillLeave(): void {
    this.resetForms();
  }
}
