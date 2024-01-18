export const regexExp = {
  bookTitle: /^(.{3,75})$/,
  bookDescription: /^(.{0,200})$/,
  anyCharNotNull: /./,
  bookPrice: /^\d+([.]\d+)?$/,
};

export const validationMessages = {
  bookTitle: "Book name has to be between 3 and 75 characters long.",
  bookDescription: "Book description can not be more than 200 characters.",
  bookCategory: "Please select book category",
  bookPrice: "Please enter valid book price",
};
