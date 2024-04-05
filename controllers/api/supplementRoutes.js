const router = require('express').Router();
const { Supplement } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newSupplement = await Supplement.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSupplement);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const supplementData = await Supplement.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!supplementData) {
      res.status(404).json({ message: 'No workout found with this ID!' });
      return;
    }

    res.status(200).json(supplementData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
