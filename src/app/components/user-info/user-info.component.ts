import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonPopover } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';

import { UserInfo } from 'src/app/core/interfaces/user-info.interface';
import { IonicStandaloneModule } from 'src/app/core/modules/ionic-standalone.module';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [IonicStandaloneModule, CommonModule, RouterModule],
})
export class UserInfoComponent {
  infoIsOpen = false;
  userInfo!: UserInfo | null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    addIcons({ person });
  }

  ngOnInit(): void {
    this.userService.getUser().then((user) => (this.userInfo = user));
  }

  @ViewChild('popover') popover!: IonPopover;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.infoIsOpen = true;
  }

  logout(): void {
    this.infoIsOpen = false;
    setTimeout(() => this.authService.logout());
  }
}
