const { Router } = require('express');
const router = Router();

//import the model
const Comment = require('../database/models/commentSchema');



router.get('/comments', async (req, res) => {
    try {
        const comment = await Comment.find();
        res.status(200).json(comment);
    } catch (error) {
        res.status(401).json({ error })
    }
})

router.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(401).json({ error })
    }
})


router.post('/comments', async (req, res) => {
    const commentData = {
        title: req.body.title,
        description: req.body.description
    };
    try {
        const post = await Comment.create(commentData);
        res.status(200).json(post);
    } catch (error) {
        res.status(401).json(error.message)
    }
})

router.patch('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const commentData = {
        title: req.body.title,
        description: req.body.descriptio
    };
    try {
        await Comment.updateOne(({ _id: id }, commentData));
        res.status(200).json({ message: 'Project edited succesfully' });
    } catch (error) {
        res.status(401).json(error.message)
    }
})

router.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Comment.deleteOne(({ _id: id }));
        res.status(200).json({ message: 'Project deleted succesfully' });
    } catch (error) {
        res.status(401).json(error.message)
    }
})


module.exports = router;