import {Component, effect, OnInit, signal} from '@angular/core';
//import {UserInfo} from '../components/user-info/user-info';
import {JournalList} from '../components/journal-list/journal-list';
import {JournalEntry, JournalEntryService} from '../services/journal-entry.service';
import {NewJournalForm} from '../components/create-journal/new-journal-form';
import {JournalFilter} from '../components/journal-filter/journal-filter';
import {JournalStats} from '../components/journal-stats/journal-stats';
import {AuthService} from '../services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ JournalList, NewJournalForm, JournalFilter, JournalStats],
  templateUrl: 'header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  entries = signal<JournalEntry[]>([]);
  stats = signal<{ mood: string, percentage: number }[]>([]);

  ngOnInit(): void {
    // inget behövs här längre eftersom vi använder effect()
  }

  //entries: JournalEntry[] = [];
  constructor(private journalEntryService: JournalEntryService, private authService: AuthService) {

    effect(() => {
      const user = this.authService.currentUser();
      if (user) {

        this.journalEntryService.getEntriesByUsername(user.username)
          .subscribe(data => this.entries.set(data));

        this.journalEntryService.getMoodStats(user.username)
          .subscribe(data => this.stats.set(data));

      } else {
        this.entries.set([]);
        this.stats.set([]);
      }
    });
  }

  // catch event from NewJournalForm
  onJournalEntryCreated(entry: JournalEntry) {
    this.entries.update(list => [...list, entry]);

      // get new stats directly after saved
      this.journalEntryService.getMoodStats(entry.username).subscribe(stats => {
        this.stats.set(stats);
    });
  }

  onDateFilter(event: {start: string, end: string}) {
    const user = this.authService.currentUser();
    if (!user) return;

    //get filtered entries
    this.journalEntryService.getEntriesByDate(user.username, event.start, event.end)
      .subscribe(entries => this.entries.set(entries));

    // get filtered statics entries
    this.journalEntryService.getMoodStats(user.username, event.start, event.end)
      .subscribe(stats => this.stats.set(stats));
  }

  logout() {
    this.authService.logout();
  }

}
