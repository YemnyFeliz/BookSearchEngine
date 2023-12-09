const typeDefs = `
#Accessible fields from 'User'
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

#Accessible fields from 'Book'
type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

#Accessible fields from 'Auth'
type Auth {
    token: ID!
    user: User
}

#Accessible fields from 'BookInput'
input BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

#Queries the frontend can make to backend
type Query {
    me: User
}

#Mutations the frontend can make to the backend
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
}

`;

module.exports = typeDefs;