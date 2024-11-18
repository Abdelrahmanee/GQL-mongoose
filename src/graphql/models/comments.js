import { Comment } from "../../db/models/comment.model.js";
import { User } from "../../db/models/user.model.js";

export const typeDef = /* GraphQL */ `
    type Query {
        comments: [Comment]!
        comment(_id: ID!): Comment
    }

    type Mutation {
        createComment(comment: NewCommentInput!): Comment!
        deleteComment(_id: ID!): Boolean!
        updateComment(_id: ID!, updatedComment: UpdateCommentInput!): Comment
    }

    input UpdateCommentInput {
        text: String!
    }

    type Comment {
        _id: ID!
        email: String
        text: String
        user: User
    }

    input NewCommentInput {
        text: String!
        email: String!
    }
`;


export const resolvers = {
    Query: {
        comments: async () => {
            try {
                const comments = await Comment.find().limit(20);
                return comments;
            } catch (error) {
                console.error("Failed to fetch comments:", error);
                throw new Error("Could not fetch comments");
            }
        },
        comment: async (parent, { _id }) => {
            try {
                const comment = await Comment.findById(_id);
                if (!comment) throw new Error("Comment not found");
                return comment;
            } catch (error) {
                console.error("Failed to fetch comment:", error);
                throw new Error("Could not fetch comment");
            }
        },
    },
    Mutation: {
        createComment: async (parent, { comment }) => {
            try {
                const newComment = await Comment.create(comment);
                return newComment;
            } catch (error) {
                console.error("Failed to create comment:", error);
                throw new Error("Could not create comment");
            }
        },
        deleteComment: async (parent, { _id }) => {
            try {
                const result = await Comment.findByIdAndDelete(_id);
                return !!result;
            } catch (error) {
                console.error("Failed to delete comment:", error);
                throw new Error("Could not delete comment");
            }
        },
        updateComment: async (parent, { _id, updatedComment }) => {
            try {
                const comment = await Comment.findByIdAndUpdate(
                    _id,
                    { text: updatedComment.text },
                    { new: true } // Return the updated document
                );
                if (!comment) throw new Error("Comment not found");
                return comment;
            } catch (error) {
                console.error("Failed to update comment:", error);
                throw new Error("Could not update comment");
            }
        },
    },
    Comment: {
        user: async ({ email }) => {
            try {
                const user = await User.findOne({ email });
                return user;
            } catch (error) {
                console.error("Failed to fetch user:", error);
                return null;
            }
        },
    },
};
