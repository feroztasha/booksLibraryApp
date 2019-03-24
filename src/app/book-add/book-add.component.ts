import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: BookService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      category: ['', Validators.required ],
      description: ['', Validators.required ]
    });
  }

  addBook(title: String, category: String, description: String) {
    this.bs.addBook(title, category, description);
    this.angForm.reset();
  }

  ngOnInit() {
  }

}
