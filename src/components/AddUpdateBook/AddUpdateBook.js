import { useEffect, useState } from "react";
import "./AddUpdateBook.css";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { regexExp, validationMessages } from "../../utils/validation";
import useForm from "../../hooks/useForm";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useBooks from "../../hooks/useBooks";

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

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    width: 95%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

function AddUpdateBook(props) {
  const { selectedBookId, handleClose } = props;
  const [showErrors, setShowErrors] = useState(false);
  const [selectedBook, setSelectedBook] = useState(false);
  const { categories, updateBookHandler, addBookHandler, getSelectedBook } =
    useBooks();

  useEffect(() => {
    setSelectedBook(getSelectedBook(selectedBookId));
  }, [selectedBookId]);

  const { values, errors, handleChange, initValues, handleSubmit } = useForm(
    () => {
      if (selectedBookId) updateBookHandler({ id: selectedBookId, ...values });
      else addBookHandler(values);
      handleClose();
    }
  );

  useEffect(() => {
    const formData = {
      title: {
        value: selectedBook ? selectedBook.title : "",
        regex: regexExp.bookTitle,
        validationMessage: validationMessages.bookTitle,
      },
      category: {
        value: selectedBook ? selectedBook.category : "Fantasy",
        regex: regexExp.anyCharNotNull,
        validationMessage: validationMessages.bookCategory,
      },
      description: {
        value: selectedBook ? selectedBook.description : "",
        regex: regexExp.bookDescription,
        validationMessage: validationMessages.bookDescription,
      },
      price: {
        value: selectedBook ? selectedBook.price : 0,
        regex: regexExp.bookPrice,
        validationMessage: validationMessages.bookPrice,
      },
    };
    initValues(formData);
  }, [selectedBook]);

  return (
    <Box sx={style}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          color="info"
          size="small"
          onClick={() => {
            handleClose();
            // e.stopPropagation();
            // dispatch(deleteBook(book));
          }}
        >
          Close
        </Button>
      </div>
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        className="form-horizontal"
        style={{ padding: 5, paddingTop: 15 }}
        onSubmit={handleSubmit}
      >
        <h2>{selectedBookId ? "Update" : "Add"} Book</h2>
        <TextField
          label="Book Name"
          onChange={(e) => handleChange(e)}
          required
          variant="outlined"
          color="secondary"
          type="text"
          name="title"
          value={values?.title}
          sx={{ mb: 3 }}
          fullWidth
        />
        {showErrors && errors?.title !== undefined && (
          <Alert severity="error" className="error-alert">
            {errors?.title}
          </Alert>
        )}
        <TextField
          label="Price"
          onChange={(e) => handleChange(e)}
          required
          variant="outlined"
          color="secondary"
          type="number"
          name="price"
          value={values?.price}
          fullWidth
          sx={{ mb: 3 }}
        />
        {showErrors && errors?.price !== undefined && (
          <Alert severity="error" className="error-alert">
            {errors?.price}
          </Alert>
        )}
        <p className="text-field-title">Category</p>
        <Select
          labelId="demo-simple-select-label"
          label="Category"
          id="demo-simple-select"
          value={values?.category || "Fantasy"}
          name="category"
          color="secondary"
          fullWidth
          sx={{ mb: 3 }}
          onChange={(e) => handleChange(e)}
        >
          {categories.map((category) => (
            <MenuItem value={category} selected={values?.category == category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        {showErrors && errors?.category !== undefined && (
          <Alert severity="error" className="error-alert">
            {errors?.category}
          </Alert>
        )}
        <p className="text-field-title">Describe the book</p>
        <Textarea
          aria-label="Description"
          minRows={3}
          placeholder="Book Description"
          fullWidth
          name="description"
          value={values?.description}
          onChange={(e) => {
            handleChange(e);
          }}
          sx={{ mb: 3 }}
        />
        {showErrors && errors?.description !== undefined && (
          <Alert severity="error" className="error-alert">
            {errors?.description}
          </Alert>
        )}
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          onClick={() => setShowErrors(true)}
        >
          {selectedBookId ? "Update" : "Add"} Book
        </Button>
      </form>
    </Box>
  );
}

export default AddUpdateBook;
