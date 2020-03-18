const { Router } = require('express');
const authMiddleware = require('../middleware/Auth.middleware');

// MODELS
const Plan = require('../models/Plan.model');
const User = require('../models/User.model');

const router = Router();

/**
 * req = {
 *  user: { userId }
 * }
 */
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const plan = new Plan({ userId: req.user.userId, date: req.body.date, title: req.body.title });
    await plan.save();

    const user = await User.findById(req.user.userId);
    user.plans.push(plan._id);
    await user.save();

    res.status(201).json(plan);
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: '[PLAN] SERVER ERROR!' });
  }
});

/**
 * req = {
 *  user: { userId }
 * }
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.user.userId });
    res.status(200).json(plans);
  } catch (e) {
    res.status(500).json({ message: '[PLAN] SERVER ERROR!' });
  }
});

/**
 * req = {
 *  user: { userId }
 *  title, date,
 *  params: { id }
 * }
 */
router.post('/:id/edit', authMiddleware, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(401).json({ message: '[PLAN] PLAN NOT EXIST!' });
    }

    plan.title = req.body.title;
    plan.date = req.body.date;
    await plan.save();

    res.status(200).json(plan);
  } catch (e) {
    res.status(500).json({ message: '[PLAN] SERVER ERROR!' });
  }
});

/**
 * req = {
 *  user: { userId },
 *  params: { id }
 * }
 */
router.post('/:id', authMiddleware, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(401).json({ message: '[PLAN] PLAN NOT EXIST!' });
    }

    res.status(200).json(plan);
  } catch (e) {
    res.status(500).json({ message: '[PLAN] SERVER ERROR!' });
  }
});

module.exports = router;