const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/update-balance', async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    await db.sequelize.transaction(async (transaction) => {
      const currentUser = await user.reload({ transaction });
      if (currentUser.balance + amount < 0) {
        throw new Error('Insufficient funds');
      }

      currentUser.balance += amount;
      await currentUser.save({ transaction });
    });

    res.send({ message: 'Balance updated', balance: user.balance });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newUser = await db.User.create({ balance: 10000 });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

module.exports = router;
