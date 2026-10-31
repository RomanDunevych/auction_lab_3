const express = require('express');
const wrap = require('../helpers/asyncHandler');

const home = require('../controllers/homeController');
const lots = require('../controllers/lotController');
const categories = require('../controllers/categoryController');
const statuses = require('../controllers/statusController');
const users = require('../controllers/userController');
const bids = require('../controllers/bidController');
const history = require('../controllers/historyController');

const router = express.Router();

// Головна
router.get('/', wrap(home.index));

// Лоти (маршрут /lots/new має стояти ПЕРЕД /lots/:id)
router.get('/lots', wrap(lots.index));
router.get('/lots/new', wrap(lots.newForm));
router.post('/lots', wrap(lots.create));
router.get('/lots/:id', wrap(lots.show));
router.get('/lots/:id/edit', wrap(lots.editForm));
router.post('/lots/:id/edit', wrap(lots.update));
router.post('/lots/:id/delete', wrap(lots.destroy));

// Категорії
router.get('/categories', wrap(categories.index));
router.get('/categories/new', wrap(categories.newForm));
router.post('/categories', wrap(categories.create));
router.get('/categories/:id/edit', wrap(categories.editForm));
router.post('/categories/:id/edit', wrap(categories.update));
router.post('/categories/:id/delete', wrap(categories.destroy));

// Статуси лотів
router.get('/statuses', wrap(statuses.index));
router.get('/statuses/new', wrap(statuses.newForm));
router.post('/statuses', wrap(statuses.create));
router.get('/statuses/:id/edit', wrap(statuses.editForm));
router.post('/statuses/:id/edit', wrap(statuses.update));
router.post('/statuses/:id/delete', wrap(statuses.destroy));

// Користувачі (маршрут /users/new має стояти ПЕРЕД /users/:id)
router.get('/users', wrap(users.index));
router.get('/users/new', wrap(users.newForm));
router.post('/users', wrap(users.create));
router.get('/users/:id', wrap(users.show));
router.get('/users/:id/edit', wrap(users.editForm));
router.post('/users/:id/edit', wrap(users.update));
router.post('/users/:id/delete', wrap(users.destroy));

// Ставки
router.get('/bids', wrap(bids.index));
router.get('/bids/new', wrap(bids.newForm));
router.post('/bids', wrap(bids.create));
router.get('/bids/:id/edit', wrap(bids.editForm));
router.post('/bids/:id/edit', wrap(bids.update));
router.post('/bids/:id/delete', wrap(bids.destroy));

// Історія ставок
router.get('/history', wrap(history.index));
router.get('/history/new', wrap(history.newForm));
router.post('/history', wrap(history.create));
router.get('/history/:id/edit', wrap(history.editForm));
router.post('/history/:id/edit', wrap(history.update));
router.post('/history/:id/delete', wrap(history.destroy));

module.exports = router;
