const router = require("express").Router();

const { 
    AddBook,
    Editbook,
    DeleteBook, 
    ShowAllAvailBook,
    ShowOwnBook
} = require('../utils/BookController');

// Show Available Book Route (/api/book/showavail)
router.get("/showavail", /*userAuth,*/ async (req, res) => {
    await ShowAllAvailBook(req.body, res);
});

// Show OwnBook Route (/api/book/showavail)
router.get("/showown/:user_id", /*userAuth,*/ async (req, res) => {
    const user_id = req.params.user_id;
    await ShowOwnBook(user_id,req.body, res);
});

// Add Book Route (/api/book/add)
router.post("/add", /*userAuth,*/ async (req, res) => {
    await AddBook(req.body, res);
});

// Edit Book Route (/api/book/edit/:id)
router.put("/edit/:id", /*userAuth,*/ async (req, res) => {
    const book_id = req.params.id
    await Editbook(book_id,req.body, res);
});

// Delete Book Route (/api/book/delete/:id)
router.delete("/delete/:id", /*userAuth,*/ async (req, res) => {
    const book_id = req.params.id
    await DeleteBook(book_id,req.body, res);
});

module.exports = router;