import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@Component({
  selector: 'app-records',
  templateUrl: 'records.page.html',
  styleUrls: ['records.page.scss'],
  standalone: true,
  imports: [IonicModule, PageHeaderComponent],
})
export class RecordsPage {
  constructor() {}
}
