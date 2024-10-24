import Recipe from "../models/Recipes.js";

const getAll = (filter = {}) => {
    let recipesQuery = Recipe.find();

    if (filter.search) {
        recipesQuery.find({ title: { $regex: filter.search, $options: 'i' } });
        // moviesQuery.regex('title', new RegExp(filter.name, 'i'))
    }

    // if (filter.typeVolcano) {
    //     recipesQuery.find({ typeVolcano: filter.typeVolcano });
        // moviesQuery.where('genre').equals(filter.genre.toLowerCase())
    // }

    // if (filter.year) {
    //     volcanoesQuery.find({ year: filter.year });
    //     // moviesQuery.where('year').equals(filter.year);
    // }

    return recipesQuery;
};

const getTopThree = () => Recipe.find().sort({createdAt: -1}).limit(3);

// const getDevicesCreatedByUser = (ownerId) => Device.find({owner: ownerId});

// const getDevicesPreferredByUser = (userId) => Device.find({ preferredList: userId});

const create = (recipe, ownerId) => Recipe.create({ ...recipe, owner: ownerId });

const getOne = (recipeId) => Recipe.findById(recipeId).populate('recommendList');

const recommend = (recipeId, userId) => {
    // const movie = await Movie.findById(movieId);
    // movie.casts.push(castId);
    // return movie.save();
    return Recipe.findByIdAndUpdate(recipeId, { $push: { recommendList: userId } });
};

const remove = (recipeId) => Recipe.findByIdAndDelete(recipeId);

const edit = (recipeId, data) => Recipe.findByIdAndUpdate(recipeId, data, {runValidators: true});

export default {
    getAll,
    getTopThree,
    // getDevicesCreatedByUser,
    // getDevicesPreferredByUser,
    create,
    getOne,
    recommend,
    remove,
    edit,
}