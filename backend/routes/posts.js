const express = require('express');
const Post =  require('../models/post');
const router = express.Router();

// Post route
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    price: req.body.price,
    stockq: req.body.stockq
  });
  post.save().then(result => {
    res.status(201).json ({
      message: 'post added successfully',
      postId: result._id
  });
  }); // 201 all ok new resource added
});

// Edit route
router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    stockq: req.body.stockq
  })
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({
      message: 'updated succesfully'
    });
  });
});

// get posts route
router.get('', (req, res, next) => {
  Post.find().then(documents => {
    // 200 = all ok
    res.status(200).json({
      posts: documents
  });
});
});

// show posts route
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  })
});

// delete post route
router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'post deleted' });
  });
});

// json route
router.get('/data', (req, res, next) => {
  Post.find().then(documents => {
    // 200 = all ok
    res.status(200).json({
      posts: documents
  });
});
});

module.exports = router;
