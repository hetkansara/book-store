import * as React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import useBooks from "./hooks/useBooks";
import AddUpdateBook from "./components/AddUpdateBook/AddUpdateBook";
import Book from "./components/Book/Book";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { books } = useBooks();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            My Books
          </Typography>
          <Button color="inherit" onClick={handleOpen}>
            Add Book
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddUpdateBook handleClose={handleClose} />
          </Modal>
        </Toolbar>
      </AppBar>
      <div class="books-container">
        <div class="book-cards-container">
          {books?.length ? (
            books.map((book) => {
              return <Book book={book}></Book>;
            })
          ) : (
            <Alert severity="info">
              There are no books available. Please add a book!
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
