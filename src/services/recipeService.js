import Recipe from "../models/Recipes.js";

const getAll = () => Recipe.find();

// const getTopThree = () => Device.find().sort({createdAt: -1}).limit(3);

// const getDevicesCreatedByUser = (ownerId) => Device.find({owner: ownerId});

// const getDevicesPreferredByUser = (userId) => Device.find({ preferredList: userId});

const create = (recipe, ownerId) => Recipe.create({ ...recipe, owner: ownerId });

// const getOne = (deviceId) => Device.findById(deviceId).populate('preferredList');

// const prefer = (deviceId, userId) => {
//     // const movie = await Movie.findById(movieId);
//     // movie.casts.push(castId);
//     // return movie.save();
//     return Device.findByIdAndUpdate(deviceId, { $push: { preferredList: userId } });
// };

// const remove = (deviceId) => Device.findByIdAndDelete(deviceId);

// const edit = (deviceId, data) => Device.findByIdAndUpdate(deviceId, data, {runValidators: true});

export default {
    getAll,
    // getTopThree,
    // getDevicesCreatedByUser,
    // getDevicesPreferredByUser,
    create,
    // getOne,
    // prefer,
    // remove,
    // edit,
}