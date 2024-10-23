import { Schema, model, Types } from 'mongoose';

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        //minLength: [2, 'The Title should be at least 2 characters, got \'{VALUE}\'!'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients is required!'],
        // minLength: [5, 'The ingredients should be at least 5 characters, got \'{VALUE}\'!'],
    },
    instructions: {
        type: String,
        required: [true, 'Instructions are required!'],
        // minLength: [5, 'The instructions should be at least 5 characters, got \'{VALUE}\'!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        // minLength: [1, 'The description should be at least 1 characters, got \'{VALUE}\'!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        // validate: [/^https?:\/\//, 'The Image should start with http:// or https://, got \'{VALUE}\'!'],
    },
    recommendList: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
},
{
    timestamps: true
}
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;