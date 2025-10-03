import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-journal-filter',
  imports: [
    FormsModule,
  ],
  templateUrl: './journal-filter.html',
  styleUrl: './journal-filter.css'
})
export class JournalFilter {

  startDate: string = "";
  endDate: string = "";

  dateFilter = output<{start: string, end: string}>();

  applyFilter() {

    if (!this.startDate || !this.endDate) {
      alert('välj både start- och slutdatum');
      return;
    }

    const start = `${this.startDate}T00:00:00`;
    const end = `${this.endDate}T23:59:59`;

    this.dateFilter.emit({start, end});
  }


}
