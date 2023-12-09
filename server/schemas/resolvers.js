const { User } = require('../models');
const { signToken } = require('../utils/auth');

//Resolvers define how GraphQL server handles the queries and mutations
const resolvers = {
    Query: {
        me: async (parent, args, context ) => {
            if (context.user) {
                return User.findOne({_id: context.user._id}); //query database for user's information
            }
            throw new Error('You need to login!');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email }); //get user from database
            if (!user) {
                throw new Error('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password); //check if password is correct
            if (!correctPw) {
                throw new Error('Incorrect password');
            }
            const token = signToken(user); //JWT token
            return { token, User }; //if email and passwords are correct return token and user
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password }); //create user
            const token = signToken(user); //generate JWT token
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } }, //add and update user's savedBooks in database
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error('You need to login!')
        },
        removeBook: async(parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } }, //remove and update user;s savedBooks in database
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error('You need to login!');
        },
    },
};

module.exports = resolvers;