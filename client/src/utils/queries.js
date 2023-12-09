import { gql } from '@apollo/client';

//fetch current user's information
export const GET_ME =gql`
{
    me {
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