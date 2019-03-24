import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  uri = 'http://localhost:4000/book';

  constructor(private http: HttpClient) { }

  addBook(title: String, category: String, description: String) {
    const obj = {
      title: title,
      category: category,
      description: description
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getBooks() {
    return this.http.get(`${this.uri}`);
  }

  editBook(id: String) {
    return this.http.get(`${this.uri}/edit/${id}`);
    }

    updateBook(title : String, category : String, description: String, id: String) {

      const obj = {
          title: title,
          category: category,
          description: description
        };
      this.http.post(`${this.uri}/update/${id}`, obj)
        .subscribe(res => console.log('Done'));
    }

    deleteBook(id: String) {
      return this.http.get(`${this.uri}/delete/${id}`);
    }

}

