import { gql } from '@apollo/client';

//login user and get token
export const LOGIN_USER = gql`
mutation login($email: String!, $password: Strin!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

//add new user and get token
export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

//save book to user
export const SAVE_BOOK = gql `
mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

//Delete a book from user
export const REMOVE_BOOK = gql `
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;