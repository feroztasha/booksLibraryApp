import { Component, OnInit } from '@angular/core';
import Book from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-get',
  templateUrl: './book-get.component.html',
  styleUrls: ['./book-get.component.css']
})
export class BookGetComponent implements OnInit {

  books: Book[];

  constructor(private bs: BookService) { }

  ngOnInit() {
    this.bs.getBooks().subscribe((data: Book[]) => {
        this.books = data;
    });
  }

  deleteBook(id: String) {
    this.bs.deleteBook(id).subscribe(res => {
      console.log('Deleted');
    });
  }
}