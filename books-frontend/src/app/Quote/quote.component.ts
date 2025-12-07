import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Login/auth';
import { Quote, QuoteService } from './quote';

@Component({
  selector: 'quote-list',
  templateUrl: './quote-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];
  showModal = false;
  newQuote: Partial<Quote> = { text: '', author: '' };

  constructor(
    private quoteService: QuoteService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.get().subscribe((quotes: Quote[]) => {
      this.quotes = quotes.slice(0, 5);
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.newQuote = { text: '', author: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editQuote(quote: Quote) {
    this.newQuote = { id: quote.id, text: quote.text, author: quote.author };
    this.showModal = true;
  }

  deleteQuote(id: number | undefined) {
    if (!id) return;
    if (!confirm('Är du säker på att du vill radera detta citat?')) return;
    this.quoteService.delete(id).subscribe(() => {
      this.loadQuotes();
    });
  }

  submitForm(event: Event) {
  event.preventDefault();

  if (!this.newQuote.text || !this.newQuote.author) {
    alert('Text och författare måste fyllas i!');
    return;
  }

  if (!this.newQuote.id && this.quotes.length >= 5) {
    alert('Du kan inte lägga till fler än 5 citat.');
    return;
  }

  const request$ = this.newQuote.id
    ? this.quoteService.update(this.newQuote.id, this.newQuote as Quote)
    : this.quoteService.add(this.newQuote as Quote);

  request$.subscribe(() => {
    this.loadQuotes();
    this.closeModal();
  });
}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get username(): string {
    return this.auth.getUsername() ?? '';
  }
}
