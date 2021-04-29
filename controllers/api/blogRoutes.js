const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const newPost = await Blogpost.findAll();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const newPost = await Blogpost.findByPk();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Blogpost.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      })

      res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;