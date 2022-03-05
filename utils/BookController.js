const Book = require('../model/book');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const ShowAllAvailBook  = async (req,res) => {
    try {
        const book = await Book.aggregate([
            { "$match": { "status": 1 } },
        ]);

        if (!book.length) {
            return res.status(404).json({
                message: "Books not Found",
                success: false
            });
        } else {
            return res.json({
                Book: book,
                succes: true
            });
        }
    } catch (error) {
        // Implement logger function (winston)
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const ShowOwnBook  = async (user_id,req,res) => {
    try {
        const book = await Book.aggregate([
            { "$match": { "user_id":  ObjectId(user_id) } },
        ]);

        if (!book.length) {
            return res.status(404).json({
                message: "Books not Found",
                success: false
            });
        } else {
            return res.json({
                Book: book,
                succes: true
            });
        }
    } catch (error) {
        // Implement logger function (winston)
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}




const AddBook = async (req,res) => {
    try{
        const { user_id, picture, title, description } = req;

        // Check required fields
        if (!user_id || !picture || !title || !description) {
            return res.status(400).json({
                message: `Please enter all fields`,
                success: false
            });
        }

        const newBook = new Book({
            user_id:ObjectId(user_id),
            buyer_id:null,
            title,
            description,
            picture,
            status:1
        })

        const newAddedBook = await newBook.save();

        return res.status(201).json({
            message: "Added new Book ",
            success: true
        });

    }catch(err){
        // Implement logger function (winston)
        console.log(err)
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const Editbook = async (book_id,req,res) => {
    try{

        let book = await Book.findById(ObjectId(book_id));

        if (!book) {
            return res.status(404).json({
                message: "Book not Found",
                success: false
            });
        }

        await Book.findOneAndUpdate({ _id: ObjectId(book_id) }, req, {
            new: true,
            runValidators: true,
        });

        return res.status(201).json({
            message: "Book Updated Successfully",
            success: true
        });



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const DeleteBook = async (book_id,req,res) => {
    try{
        let book = await Book.findById(ObjectId(book_id));

        if (!book) {
            return res.status(404).json({
                message: "Book not Found",
                success: false
            });
        }
        await Book.deleteOne({ _id: ObjectId(book_id) });

        return res.status(201).json({
            message: "Deleted Successfully",
            success: true
        });

    }catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

module.exports = {
    AddBook,
    Editbook,
    DeleteBook,
    ShowAllAvailBook,
    ShowOwnBook
};