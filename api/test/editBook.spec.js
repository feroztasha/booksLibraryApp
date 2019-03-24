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


    it("should get the book record handler for edit", (done) => {
      let singleBook = new book( {
        title: "Intelligent Investor",
        category: "Business",
        description: "The Intelligent Investor by Benjamin Graham, first published in 1949, is a widely acclaimed book on value investing."
    });
    singleBook.save((err,book)=>{
      chai.request(app)
          .get('/book/edit/'+singleBook.id)
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json; 
                res.body.should.be.a('object'); 
                res.body.should.have.property('title');
                res.body.title.should.equal('Intelligent Investor');
              done();
           });

    });

  });
});
