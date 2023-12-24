import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ResultItem } from 'src/app/core/interfaces/results.interface';
import { ResultsApiService } from 'src/app/core/services/results/results-api.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PageHeaderComponent],
})
export class HistoryPage {
  resultsList$!: Observable<ResultItem[]>;

  constructor(private resultsApiService: ResultsApiService) {}

  ionViewWillEnter(): void {
    this.resultsList$ = this.resultsApiService.getMyResultsList();
  }
}
