import * as React from "react";
import BookCard from "../BookCard/BookCard";
import "./Book.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddUpdateBook from "../AddUpdateBook/AddUpdateBook";

function Book(props) {
  const { book } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedBookId, setSelectedBookId] = React.useState(null);
  const handleOpen = () => {
    setSelectedBookId(book.id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{ height: "100%" }}>
        <BookCard book={book} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddUpdateBook
          selectedBookId={selectedBookId}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
}

export default Book;
