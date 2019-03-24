import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  angForm: FormGroup;
  book: any = {};
 

  constructor(private route: ActivatedRoute,
    private router: Router,
    private bs: BookService,
    private fb: FormBuilder) {
      this.createForm();
 }

  createForm() {
    this.angForm = this.fb.group({
        title: ['', Validators.required ],
        category: ['', Validators.required ],
        description: ['', Validators.required ]
      });
    }

    

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.bs.editBook(params['id']).subscribe(res => {
          this.book = res;
      });
    });
  }

  updateBook(title: String, category: String, description: String) {
    this.route.params.subscribe(params => {
       this.bs.updateBook(title, category, description, params['id']);
       this.router.navigate(['book']);
 });
}

}
