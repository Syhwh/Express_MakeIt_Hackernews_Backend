const { Router } = require('express');
const router = Router();
const metadata = require('../utils/getMetadata.js')
//import the model
const Post = require('../database/models/postSchema');
const Commentary = require('../database/models/commentSchema');
const verifyToken =require('../middleware/verifyToken');
// router.get('/', (req, res) => {
//     res.status(200).json({ response: 'ok' });
// });


router.get('/', async (req, res) => {
  try {
    const postsResponse = await Post.find(); 
    res.status(200).json(postsResponse);
  } catch (error) {
    res.status(401).json({ error })
  }
})

router.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postsResponse = await Post.findById(id);
    res.status(200).json(postsResponse);
  } catch (error) {
    res.status(401).json({ error })
  }
})


router.post('/posts', async (req, res) => {

  try {
    const postData = {
      title: req.body.title,
      url: req.body.url,
      article: await metadata(req.body.url) || ''
    };

    const post = await Post.create(postData);
    res.status(200).json(post);
  } catch (error) {
    res.status(401).json(error.message)
  }
})

router.patch('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const postData = {
    title: req.body.title,
    url: req.body.url,
    description: req.body.description || ''
  };
  try {
    await Post.updateOne(({ _id: id }, postData));
    res.status(200).json({ message: 'Project edited succesfully' });
  } catch (error) {
    res.status(401).json(error.message)
  }
})

router.delete('/posts/:id', verifyToken,async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deleteOne(({ _id: id }));
    res.status(200).json({ message: 'Project deleted succesfully' });
  } catch (error) {
    res.status(401).json(error.message)
  }
})


module.exports = router;