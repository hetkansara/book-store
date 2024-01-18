import * as React from "react";
import "./BookCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useBooks from "../../hooks/useBooks";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BookCard(props) {
  const { book } = props;
  const { deleteBookHandler } = useBooks();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ maxWidth: 345 }} className="action-card">
      <CardActions className="card-action">
        <Button onClick={handleOpen} style={{ height: "100%" }}>
          Delete
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="delete-actions">
              <Typography gutterBottom variant="h5" component="div">
                Are you sure you want to delete this book - <b>{book.title}</b>?
              </Typography>
              <div className="delete-action-btns">
                <Button
                  color="info"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBookHandler(book);
                    handleClose();
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </CardActions>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography gutterBottom variant="subtitle" component="div">
          Price: ${book.price}
        </Typography>

        <Typography gutterBottom variant="subtitle" component="div">
          Category: {book.category}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="book-description"
          title={book.description}
        >
          {book.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BookCard;
