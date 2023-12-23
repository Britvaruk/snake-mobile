import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
  standalone: true,
  imports: [IonicModule, PageHeaderComponent],
})
export class GamePage {
  constructor() {}
}
