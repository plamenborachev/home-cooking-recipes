import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { TITLE_CATALOG_PAGE, TITLE_CREATE_PAGE } from "../config/constants.js";
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







export default recipeController;