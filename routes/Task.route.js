const { Router } = require('express');
const authMiddleware = require('../middleware/Auth.middleware');

// MODELS
const Task = require('../models/Task.model');
const Plan = require('../models/Plan.model');

const router = Router();

/**
 * req = {
 *  body: { planId, title }
 *  user: { userId }
 * }
 */
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { planId, title } = req.body;
    const task = new Task({ userId: req.user.userId, planId, text: title, checked: false });
    await task.save();

    const plan = await Plan.findOne({ _id: planId });
    plan.tasks.push(task._id);
    await plan.save();

    res.status(201).json(task);
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: '[TASK] SERVER ERROR!' });
  }
}
);

/**
 * req = {
 *  user: { userId },
 *  body: { planId }
 * }
 */
router.post('/remove', authMiddleware, async (req, res) => {
  try {
    await Task.deleteMany({ planId: req.body.planId });

    const plan = await Plan.findById(planId)
    plan.tasks = [];

    await plan.save();
    
    res.status(200);
  } catch (e) {
    res.status(500).json({ message: '[TASK] SERVER ERROR!' });
  }
}
);

/**
 * req = {
 *  body: { planId }
 *  user: { userId }
 * }
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });

    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: '[TASK] SERVER ERROR!' });
  }
}
);

/**
 * req = {
 *  body: { planId, text, checked }
 *  user: { userId },
 *  params: { id }
 * }
 */
router.post('/:id/edit', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(401).json({ message: '[TASK] TASK NOT EXIST!' });
    }

    task.text = req.body.text;
    task.checked = req.body.checked;
    await task.save();

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: '[TASK] SERVER ERROR!' });
  }
}
);

/**
 * req = {
 *  user: { userId },
 *  body: { planId }
 *  params: { id }
 * }
 */
router.post('/:id/remove', authMiddleware, async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });

    const plan = await Plan.findById(planId);
    plan.tasks = plan.tasks.filter(task => task !== req.params.id);
    await plan.save();
    
    res.status(200);
  } catch (e) {
    res.status(500).json({ message: '[TASK] SERVER ERROR!' });
  }
}
);

/**
 * req = {
 *  body: { planId }
 *  user: { userId },
 *  params: { id }
 * }
 */
router.post('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(401).json({ message: '[TASK] TASK NOT EXIST!' });
    }

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: '[TASK] SERVER ERROR!' });
  }
}
);

module.exports = router;