const { Router } = require('express');
const router = Router();

//import the model
const Comment = require('../database/models/commentSchema');
const User = require('../database/models/userSchema');
//middleware
const verifyToken = require('../middleware/verifyToken');


// router.get('/comments', async (req, res) => {
//     try {
//         const comment = await Comment.find();
//         res.status(200).json(comment);
//     } catch (error) {
//         res.status(401).json({ error })
//     }
// })

router.get('/comments/:id', async (req, res) => {
    const { id } = req.params; //id del post
    try {
        const comments = await Comment.find({ post: id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(401).json({ error })
    }
})


router.post('/comments', verifyToken, async (req, res) => {

    try {
        const user = await User.findById(req.userId)
        const commentData = {
            userId: req.userId,
            userName: user.name,
            post: req.body.post,
            comment: req.body.comment
        }
        const comment = await Comment.create(commentData);
        console.log(comment)
        res.status(200).json(comment);
    } catch (error) {
        res.status(401).json(error.message)
    }
})

// router.patch('/comments/:id', async (req, res) => {
//     const { id } = req.params;
//     const commentData = {
//         title: req.body.title,
//         description: req.body.descriptio
//     };
//     try {
//         await Comment.updateOne(({ _id: id }, commentData));
//         res.status(200).json({ message: 'Comment edited succesfully' });
//     } catch (error) {
//         res.status(401).json(error.message)
//     }
// })

// router.delete('/comments/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Comment.deleteOne(({ _id: id }));
//         res.status(200).json({ message: 'Comment deleted succesfully' });
//     } catch (error) {
//         res.status(401).json(error.message)
//     }
// })


module.exports = router;