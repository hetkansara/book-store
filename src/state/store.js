import {configureStore} from '@reduxjs/toolkit';
import bookReducer from './book/bookState';

export const store = configureStore({
    reducer: {
        books: bookReducer,
    }
});