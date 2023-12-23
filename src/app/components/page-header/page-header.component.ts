import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [IonicModule, UserInfoComponent],
})
export class PageHeaderComponent {
  @Input({ required: true }) title!: string;
}
