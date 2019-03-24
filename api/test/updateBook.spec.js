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

        it("should update the book record", (done) => {
            let actualBook = new book( {
              title: "Intelligent Investor",
              category: "Business",
              description: "The Intelligent Investor by Benjamin Graham, first published in 1949, is a widely acclaimed book on value investing."
          });
          let updatedBook = new book( {
            title: "Intelligent Investor Edition 2",
            category: "Business Edition",
            description: "The Intelligent Investor by Benjamin Graham, first published in 1949, is a widely acclaimed book on value investing."
        });
            actualBook.save((err,book)=>{
            chai.request(app)
                .post('/book/update/'+actualBook.id)
                .send(updatedBook)
                .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json; 
                res.should.have.property('text').eql("\"Update complete\"");
                    done();
                 });
      
          });
      
        });
});
