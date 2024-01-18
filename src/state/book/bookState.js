import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      id: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      price: 15,
      category: "Fantasy",
      description:
        "('Harry Potter and the Sorcerer's Stone' in the U.S) (UK release: 26 June, 1997; US release 9 January, 1998)",
    },
    {
      id: 2,
      title: "Harry Potter and the Chamber of Secrets",
      price: 12,
      category: "Fantasy",
      description: "(UK release: 2 July, 1998; US release 6 February, 1999)",
    },
    {
      id: 3,
      title: "Harry Potter and the Prisoner of Azkaban",
      price: 13,
      category: "Fantasy",
      description: "(UK release: 8 July, 1999; US release 9 August, 1999)",
    },
    {
      id: 4,
      title: "Harry Potter and the Goblet of Fire",
      price: 15,
      category: "Fantasy",
      description: "(UK & US releases: 8 July, 2000)",
    },
    {
      id: 5,
      title: "Harry Potter and the Order of the Phoenix",
      price: 18,
      category: "Horror",
      description: "(UK & US releases: 21 June, 2003)",
    },
    {
      id: 6,
      title: "Harry Potter and the Half-Blood Prince",
      price: 18,
      category: "Horror",
      description: "(UK & US releases: 16 July, 2005)",
    },
    {
      id: 7,
      title: "Harry Potter and the Deathly Hallows",
      price: 18,
      category: "Horror",
      description: "(UK & US releases: 21 July, 2007)",
    },
  ],
  categories: [
    "Fantasy",
    "Horror",
    "Science Fiction",
    "Romance",
    "Thriller",
    "Mystery",
  ],
  currentId: 8,
};

const bookState = createSlice({
  name: "books",
  initialState,
  reducers: {
    updateBook: (state, action) => {
      state.value.forEach((item, index) => {
        if (item.id === action.payload.value.id) {
          state.value[index] = action.payload.value;
        }
      });
    },
    addBook: (state, action) => {
      state.value.push({ ...action.payload.value, id: state.currentId });
      state.currentId++;
    },
    deleteBook: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { updateBook, addBook, deleteBook } = bookState.actions;

export default bookState.reducer;
