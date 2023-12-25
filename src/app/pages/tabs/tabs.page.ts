import { Component } from '@angular/core';
import { IonicStandaloneModule } from 'src/app/core/modules/ionic-standalone.module';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicStandaloneModule],
})
export class TabsPage {}
