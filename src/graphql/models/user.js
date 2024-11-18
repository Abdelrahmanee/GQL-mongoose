

import { ObjectId } from "mongodb";
import { User } from "../../db/models/user.model.js";
export const typeDef = /* GraphQL */ `
   type Query {
      hello: String
      users: [User!]!
      user(id: ID!): User
   }

   type User {
      name: String!
      email: String!
      id: ID!
      comments:[Comment]
   }

   type Mutation {
      createUser(user: newUserInput!): User
      deleteUser(id: ID!): Boolean
      updateUser(id: ID!, update: updateUserInput!): User
   }

   input newUserInput {
      name: String!
      email: String!
   }

   input updateUserInput {
      name: String!
   }
`;




export const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await User.find().limit(20);
                return users;
            } catch (err) {
                console.error("Failed to fetch users:", err);
                throw new Error("Could not fetch users");
            }
        },
        user: async (parent, { id }) => {
            try {
                const user = await User.findById(id);
                if (!user) throw new Error("User not found");
                return user;
            } catch (err) {
                console.error("Failed to fetch user:", err);
                throw new Error("Could not fetch user");
            }
        },
    },
    Mutation: {
        createUser: async (parent, { user }) => {
            try {
                const newUser = await User.create(user);
                return newUser;
            } catch (err) {
                console.error("Failed to create user:", err);
                throw new Error("Could not create user");
            }
        },
        deleteUser: async (parent, { id }) => {
            try {
                const result = await User.findByIdAndDelete(id);
                return !!result; // Returns true if deleted, false otherwise
            } catch (err) {
                console.error("Failed to delete user:", err);
                throw new Error("Could not delete user");
            }
        },
        updateUser: async (parent, { id, update }) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    update,
                    { new: true } // Return the updated document
                );
                if (!updatedUser) throw new Error("User not found");
                return updatedUser;
            } catch (err) {
                console.error("Failed to update user:", err);
                throw new Error("Could not update user");
            }
        },
    },
    User: {
        id: (parent) => parent._id.toString(), // Converts MongoDB `_id` to string
    },
};
