import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface JournalEntry {
  id: number;
  note: string;
  moodStatus: string;
  username: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {

  private apiUrl = 'http://localhost:8080/api/journals'
  private apiUrlCreate = 'http://localhost:8080/api/journals/create-note'

  //signal that holds all entries
  //entries = signal<JournalEntry>([]);


  constructor(private http: HttpClient) {}

  getEntriesByUsername(username: string): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(`${this.apiUrl}/${username}`);
  }

  createJournalEntry(entry: Partial<JournalEntry>): Observable<JournalEntry> {
    return this.http.post<JournalEntry>(`${this.apiUrlCreate}`, entry)

  }

  getEntriesByDate(username: string, startDate: string, endDate:string): Observable<JournalEntry[]> {
    const params = {startDate, endDate};
    return this.http.get<JournalEntry[]>(`${this.apiUrl}/${username}/by-date`, { params });
  }

  getMoodStats(username: string, startDate?: string, endDate?: string): Observable<{mood: string, percentage: number}[]> {
    const params: any = {}; // now we can send a empty object if we don't have chosen dates
    if (startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;


    }
    return this.http.get<{ mood: string, percentage: number }[]>(`${this.apiUrl}/${username}/stats`, { params });
  }
}
