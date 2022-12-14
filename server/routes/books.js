<!-- File Name: books.js, Student Name: Liu Chengqing, Student ID: 301250073 -->

// modules required for routing
const e = require('connect-flash');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  
      res.render('books/details', {title: "Add a book", books:''});


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    console.log("11111",req.body);
    
    let newBook = book({
      "Title":req.body.title,
      "Description":req.body.description,
      "Price":req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre
    });
 
/*****************
    let newBook = book({
      "Title":"TT",
      "Description":"VV",
      "Price":12,
      "Author":"KL",
      "Genre":"MP"
    });

    *****************/
    console.log(newBook);
    console.log("Code to here");
    book.create(newBook,(err,book) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      res.redirect('/books');
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    
   
    book.findById(req.params.id,(err,book) => {
      if (err){
        return console.error(err);
      } else{
        res.render('books/details',{title:'Edit a book', books:book});
        
      }

    });
   

  });
  

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    let updateBook = {
        "_id":id,
        "Title":req.body.title,
        "Description":req.body.description,
        "Price": req.body.price,
        "Author":req.body.author,
        "Genre":req.body.genre
    }

    book.updateOne({_id:id},updateBook,(err)=>{
       if(err){
        console.log(err);
        res.end(err);
       } else{
        res.redirect('/books');
       }

    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     console.log("2222",req.params);

    let id=req.params.id;
    book.remove({_id:id},(err)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      res.redirect('/books');
    });
});


module.exports = router;
