import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ResultItem } from 'src/app/core/interfaces/results.interface';
import { ResultsApiService } from 'src/app/core/services/results/results-api.service';
import { IonicStandaloneModule } from 'src/app/core/modules/ionic-standalone.module';

@Component({
  selector: 'app-records',
  templateUrl: 'records.page.html',
  styleUrls: ['records.page.scss'],
  standalone: true,
  imports: [IonicStandaloneModule, CommonModule, PageHeaderComponent],
})
export class RecordsPage {
  recordsList$!: Observable<ResultItem[]>;

  constructor(private resultsApiService: ResultsApiService) {}

  ionViewWillEnter(): void {
    this.recordsList$ = this.resultsApiService.getRecordsList();
  }
}
