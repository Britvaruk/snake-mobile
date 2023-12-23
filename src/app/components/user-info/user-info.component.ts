import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonPopover, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class UserInfoComponent {
  infoIsOpen = false;

  constructor(private authService: AuthService) {
    addIcons({ person });
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
