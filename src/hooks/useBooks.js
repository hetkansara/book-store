import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook, deleteBook } from "../state/book/bookState";

const useBooks = () => {
    const categories = useSelector((state) => state.books.categories);
    const books = useSelector((state) => state.books.value);
    const dispatch = useDispatch();

    const addBookHandler = (book) => {
        dispatch(addBook({value: book}));
    };

    const updateBookHandler = (book) => {
        dispatch(updateBook({value: book}));
    }

    const deleteBookHandler = (book) => {
        dispatch(deleteBook({id: book.id}));
    }

    const getSelectedBook = (id) => {
        return books.find((book) => book.id === id);
    }

    return {
        books,
        categories,
        addBookHandler,
        updateBookHandler,
        deleteBookHandler,
        getSelectedBook
    };
};

export default useBooks;
