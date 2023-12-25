import { Component, Input } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { IonicStandaloneModule } from 'src/app/core/modules/ionic-standalone.module';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [IonicStandaloneModule, UserInfoComponent],
})
export class PageHeaderComponent {
  @Input({ required: true }) title!: string;
}
