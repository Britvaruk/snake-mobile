import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  standalone: true,
  imports: [IonicModule, PageHeaderComponent],
})
export class HistoryPage {
  constructor() {}
}