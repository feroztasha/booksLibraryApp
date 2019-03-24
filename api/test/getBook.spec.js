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
         });   
        let singleBook = new book( {
            title: "Intelligent Investor",
            category: "Business",
            description: "The Intelligent Investor by Benjamin Graham, first published in 1949, is a widely acclaimed book on value investing."
        });
          chai.request(app)
          .post('/book/add')
          .send(singleBook)
          .end((err, res) => {
            done();
          });     
    });

    it("should get the book record", (done) => {
        chai.request(app)
            .get('/book')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array'); 
                res.body.should.have.length(1);
                res.body[0].should.have.property('title').eql('Intelligent Investor'); 
                res.body[0].should.have.property('category').eql('Business'); 
                done();
             });
    });
});
