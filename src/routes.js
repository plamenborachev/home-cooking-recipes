import { Router } from 'express';

import homeController from './controllers/homeController.js';
import authController from './controllers/authController.js';
import recipeController from './controllers/recipeController.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/recipes', recipeController);

routes.all('*', (req, res) => {
    res.render('home/404', {title:'404 Page'});
});

export default routes;