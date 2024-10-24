import { Router } from 'express';
import { TITLE_HOME_PAGE } from '../config/constants.js';
import recipeService from '../services/recipeService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const getTopThreeRecipes = await recipeService.getTopThree().lean();
    res.render('home', {getTopThreeRecipes, title: TITLE_HOME_PAGE});
});

// homeController.get('/about', (req, res) => {
//     res.render('home/about', {title: 'TechStore - About Us'});
// });

//to test authMiddleware
// homeController.get('/authorized', (req, res) => {
//     res.send(req.user);
// });

export default homeController;