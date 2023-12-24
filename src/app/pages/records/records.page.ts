import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ResultItem } from 'src/app/core/interfaces/results.interface';
import { ResultsApiService } from 'src/app/core/services/results/results-api.service';

@Component({
  selector: 'app-records',
  templateUrl: 'records.page.html',
  styleUrls: ['records.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PageHeaderComponent],
})
export class RecordsPage {
  recordsList$!: Observable<ResultItem[]>;

  constructor(private resultsApiService: ResultsApiService) {}

  ionViewWillEnter(): void {
    this.recordsList$ = this.resultsApiService.getRecordsList();
  }
}
