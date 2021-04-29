const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
      alert('success')
    } catch (err) {
      res.status(400).json(err);
      alert('failure')
    }
  });

  
module.exports = router;