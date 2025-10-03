import {Component, input, Input, OnInit, signal} from '@angular/core';
import {JournalEntry, JournalEntryService} from '../../services/journal-entry.service';
import {CommonModule} from '@angular/common';
import {NewJournalForm} from '../create-journal/new-journal-form';

@Component({
  selector: 'app-journal-list',
  imports: [CommonModule],
  templateUrl: './journal-list.html',
  styleUrl: './journal-list.css'
})
export class JournalList{

  entries = input.required<JournalEntry[]>();


  constructor(private journalEntryService: JournalEntryService) {}

}
