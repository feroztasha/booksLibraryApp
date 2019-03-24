let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let book = require('../models/book');

// Configure chai
chai.use(chaiHttp);
chai.should();

 describe("Testing Book", () => {

        beforeEach((done) => {
            book.deleteMany({}, (err) => { 
               done();           
            });        
        });

        it('it should create a book', (done) => {
            let singleBook = new book( {
                title: "Rich Dad Poor Dad",
                category: "Finance",
                description: "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter"
            });
              chai.request(app)
              .post('/book/add')
              .send(singleBook)
              .end((err, res) => {
                    res.should.have.status(200);
              done();
              });
        });
});
