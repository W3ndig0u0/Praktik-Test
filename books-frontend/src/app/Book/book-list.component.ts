import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Book, BookService } from './book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Login/auth';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  standalone: true,  
  imports: [
    CommonModule, 
    FormsModule
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  showModal = false;
  newBook: Partial<Book> = { title: '', author: '', publishedAt: '' };

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  openAddBook() {
    if (this.auth.isLoggedIn()) {
      this.openModal();
    } else {
      alert('Du måste logga in för att spara böcker!');
    }
  }

  loadBooks() {
    this.bookService.get().subscribe((books: Book[]) => {
      this.books = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        publishedAt: new Date(book.publishedAt).toISOString().split('T')[0],
      }));
      console.log(this.books);
      this.cdr.detectChanges();
    });
  }

  editBook(book: Book) {
    this.newBook = {
      id: book.id,
      title: book.title || '',
      author: book.author || '',
      publishedAt: book.publishedAt || ''
    };
    this.showModal = true;
  }

  deleteBook(id: number | undefined) {
    if (!id) return;
    if (!confirm('Är du säker på att du vill radera denna bok?')) return;
    this.bookService.delete(id).subscribe(() => {
      this.loadBooks();
    });
  }

  openModal() {
    this.newBook = { title: '', author: '', publishedAt: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.newBook.title || !this.newBook.author || !this.newBook.publishedAt) {
      alert('Titel, författare och publiceringsdatum måste fyllas i!');
      return;
    }

    const bookData = {
      title: this.newBook.title,
      author: this.newBook.author,
      publishedAt: new Date(this.newBook.publishedAt + "T00:00:00").toISOString()
    };

    const request$ = this.newBook.id
      ? this.bookService.update(this.newBook.id, bookData)
      : this.bookService.add(bookData);

    request$.subscribe(() => {
      this.loadBooks();
      this.closeModal();
    }, (err) => {
      console.error('Error creating/updating book:', err);
      alert('Något gick fel vid sparning av boken.');
    });
  }
}
