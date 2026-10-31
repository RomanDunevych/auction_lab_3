const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const { sequelize, LotStatus } = require('./models');
const seed = require('./seed');
const registerFilters = require('./helpers/filters');
const routes = require('./routes');

const app = express();

// --- Шаблонізатор Nunjucks ---
const env = nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true, // екранування HTML (захист від XSS)
  express: app,
  noCache: true,    // шаблони перечитуються при кожному запиті (зручно під час розробки)
});
registerFilters(env);
app.set('view engine', 'njk');

// --- Проміжні обробники (middleware) ---
app.use(express.urlencoded({ extended: false })); // розбір даних HTML-форм у req.body (прості пари «поле = значення»)
app.use(express.static(path.join(__dirname, 'public'))); // CSS та інші статичні файли

// Повідомлення про успіх/помилку, що передаються через адресу (?ok=... / ?error=...)
const NOTICES = {
  created: 'Запис створено',
  updated: 'Зміни збережено',
  deleted: 'Запис видалено',
  bid: 'Ставку прийнято',
};
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.notice = Object.hasOwn(NOTICES, req.query.ok) ? NOTICES[req.query.ok] : null;
  res.locals.error = typeof req.query.error === 'string' ? req.query.error : null;
  next();
});

// --- Маршрути ---
app.use('/', routes);

// 404
app.use((req, res) => {
  res.status(404).render('error', { title: 'Не знайдено', code: 404, message: 'Сторінку не знайдено' });
});

// Обробник помилок (4 аргументи)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { title: 'Помилка', code: 500, message: 'Внутрішня помилка сервера' });
});

// --- Запуск ---
(async () => {
  await sequelize.sync(); // створює таблиці, якщо їх ще немає (дані НЕ видаляються)
  if ((await LotStatus.count()) === 0) {
    await seed(); // тестові дані лише для порожньої бази
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server: http://localhost:${port}`));
})();
