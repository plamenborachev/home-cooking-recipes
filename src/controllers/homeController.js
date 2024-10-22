import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', {title: 'TechStore - Laptops and Computers'});
});

homeController.get('/about', (req, res) => {
    res.render('home/about', {title: 'TechStore - About Us'});
});

//to test authMiddleware
// homeController.get('/authorized', (req, res) => {
//     res.send(req.user);
// });

export default homeController;