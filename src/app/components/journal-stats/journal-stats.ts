import {Component, input} from '@angular/core';
import {JournalEntry} from '../../services/journal-entry.service';
import {KeyValuePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-journal-stats',
  imports: [
    NgForOf
  ],
  templateUrl: './journal-stats.html',
  styleUrl: './journal-stats.css'
})
export class JournalStats {

  // Signal from parent
  stats = input.required<{ mood: string, percentage: number }[]>();

}
