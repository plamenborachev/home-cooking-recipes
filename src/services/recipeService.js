import Recipe from "../models/Recipes.js";

const getAll = () => Recipe.find();

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

// const edit = (deviceId, data) => Device.findByIdAndUpdate(deviceId, data, {runValidators: true});

export default {
    getAll,
    getTopThree,
    // getDevicesCreatedByUser,
    // getDevicesPreferredByUser,
    create,
    getOne,
    recommend,
    remove,
    // edit,
}