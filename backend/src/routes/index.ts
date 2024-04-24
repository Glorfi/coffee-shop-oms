import express from 'express';
import drinksRouter from './drinks-router.js';

import categoryRouter from './category-router.js';
// import usersRouter from './users.js';
// import regRouter from './reg.js';
// import { auth } from '../middlewares/auth.js';
// import exsRouter from './exercises.js';
// import sentencesRouter from './sentences.js';
// import topicsRouter from './topics.js';

export const router = express.Router();

router.use('/drinks', drinksRouter);
router.use('/categories', categoryRouter);

// router.use('/auth', regRouter);
// router.use('/users', auth, usersRouter);
// router.use('/exercises', exsRouter);
// router.use('/sentences', auth, sentencesRouter);
// router.use('/topics', auth, topicsRouter);
