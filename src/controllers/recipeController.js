import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { TITLE_CATALOG_PAGE, TITLE_CREATE_PAGE, TITLE_DETAILS_PAGE } from "../config/constants.js";
import recipeService from "../services/recipeService.js";

const recipeController = Router();

recipeController.get('/create', isAuth, (req, res) => {
    res.render('recipe/create', {title: TITLE_CREATE_PAGE});
});

recipeController.post('/create', isAuth, async (req, res) => {
    const recipeData = req.body;
    const ownerId = req.user._id;

    //console.log(deviceData);

    try{
        await recipeService.create(recipeData, ownerId);
        res.redirect('/recipes/catalog');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        return res.render('recipe/create', { error: errorMessage, recipe: recipeData, title: TITLE_CREATE_PAGE});
    }
});

recipeController.get('/catalog', async (req, res) => {
    const recipes = await recipeService.getAll().lean();
    res.render('recipe/catalog', { recipes, title: TITLE_CATALOG_PAGE});
});

recipeController.get('/details/:recipeId', async (req, res) => {
    const { recipe, isOwner, recommended } = await checkOwnerAndRecommended(req, res);

    // console.log(device.preferredList);
    // console.log(req.user?._id);
    // console.log(isOwner);
    // console.log(preferred);

    res.render('recipe/details', { recipe, isOwner , recommended, title: recipe.title + TITLE_DETAILS_PAGE});
});

recipeController.get('/recommend/:recipeId', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    const { recipe, isOwner, recommended } = await checkOwnerAndRecommended(req, res);

    // console.log(device.preferredList);
    // console.log(req.user?._id);
    // console.log(isOwner);
    // console.log(preferred);

    if (isOwner){
        return res.render('recipe/details',
            { error: `You are owner of ${recipe.title} and can not recommend it!`, recipe, isOwner, recommended, title: recipe.title + TITLE_DETAILS_PAGE});
        // res.setError('You cannot vote for this volcano!');
        // return res.redirect('/404');
    }

    if (recommended){
        return res.render('recipe/details',
            { error: 'You\'ve already recommended this recipe!', recipe, isOwner, recommended, title: recipe.title + TITLE_DETAILS_PAGE});
    }

    try {
        await recipeService.recommend(recipeId, userId);
        res.redirect(`/recipes/details/${recipeId}`);
    } catch(err){ 
        console.log(err);
    }    
});

recipeController.get('/delete/:recipeId', isAuth, async (req, res) => {
    const recipeId = req.params.recipeId;
    const { recipe, isOwner, recommended } = await checkOwnerAndRecommended(req, res);

    // Check if owner
    if (!isOwner) {
        return res.render('recipe/details',
            { recipe, isOwner: false, recommended, error: 'You cannot delete this recipe!', title: recipe.title + TITLE_DETAILS_PAGE});
        // res.setError('You cannot delete this volcano!');
        // return res.redirect('/404');
    }

    try {
        await recipeService.remove(recipeId);
        res.redirect('/recipes/catalog');
    } catch (err) {
        console.log(err);       
        // const errorMessage = getErrorMessage(err);
        // return res.render('volcano/details', { volcano: volcano, error: err , title: 'Details'});
    }
});

async function checkOwnerAndRecommended(req, res) {
    const recipeId = req.params.recipeId;
    const userId = req.user?._id;
    let recipe = {};

    try {
        recipe = await recipeService.getOne(recipeId).lean();        
    } catch (err){
        console.log(err);
        res.redirect('/404');
    } 

    const isOwner = recipe.owner && recipe.owner.toString() === userId;
    const recommended = recipe.recommendList?.some(recommend => recommend._id.toString() === userId);
    return { recipe, isOwner, recommended };
}

export default recipeController;