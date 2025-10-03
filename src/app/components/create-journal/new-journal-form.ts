import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {JournalEntry, JournalEntryService} from '../../services/journal-entry.service';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-create-journal',
  imports: [FormsModule, NgForOf],
  templateUrl: './new-journal-form.html',
  styleUrl: './new-journal-form.css'
})
export class NewJournalForm {

  journalEntryCreated = output<JournalEntry>();

  moods: string[] = [
    'GLAD', 'LEDSEN', 'ARG', 'STRESSAD', 'TRÖTT', 'KÄR',
    'ÖVERVÄLDIGAD', 'LUGN', 'FUNDERSAM', 'MOTIVERAD', 'OROLIG',
    'FRUSTRERAD', 'TACKSAM', 'NERVÖS', 'HOPPFULL'
  ];

  selectedMood: string = '';
  username: string = "";
  note: string = "";

  constructor(private journalEntryService: JournalEntryService, private authService: AuthService) {}

  formSubmit() {
    console.log("👉 formSubmit() TRIGGERED");  // Första log: ser om Angular kör den två gånger


    const newJournalEntry: Partial<JournalEntry> = {
      username: this.authService.currentUser()?.username,
      note: this.note,
      moodStatus: this.selectedMood
    };

    console.log("Payload som skickas till backend:", newJournalEntry);

    this.journalEntryService.createJournalEntry(newJournalEntry)
      .subscribe(savedEntry => {
        console.log("Entry saved in backend", savedEntry);

        // Emit real object from backend
        this.journalEntryCreated.emit(savedEntry);

        // clear field:
        this.note = "";
        this.selectedMood = "";
      });

  }
}
