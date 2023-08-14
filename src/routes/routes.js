import express from "express";
import videoListModels from '../models/videoListModels.js';
import productListModels from '../models/productListModels.js';
import commentListModels from '../models/commentlistModels.js';

const videoListRouter = express.Router();
const productListRouter = express.Router();
const commentListRouter = express.Router();

//Method GET getVideoList Video Thumbnail List API
videoListRouter.get('/', async (req, res) => {
  try {
    const videolist = await videoListModels.find();
    res
      .json(videolist)
      .status(200)
  }
  catch (err) {
    res.status(404).json({ message: "videos not found" })
  }
});

// Method GET getProductList to get product list from database
productListRouter.get('/:videoID', async (req, res) => {
  const { videoID } = req.params;
  try {
    // Get the Product List for a specific video ID from videolists collection
    const video = await videoListModels.findOne({ videoID })
    if (!video) {
      return res.status(404).json({ message: "video ID is not found in database" })
    }

    const productList = await productListModels.find({ videoID })
    res.status(200).json(productList);
  }
  catch (error) {
    res.status(500).json({ message: 'internal server error' })
  }
})

// Method GET getProductDetails to get product details by productName
productListRouter.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const product = await productListModels.findOne({ productName: { $regex: query, $options: 'i' } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// Method GET commentlist to get comment list in database
commentListRouter.get('/:videoID', async (req, res) => {
  const { videoID } = req.params

  try {
    const video = await videoListModels.findOne({ videoID })

    if (!video) {
      return res.status(404).json({ message: 'Video ID not found in database!' })
    }
    const commentList = await commentListModels.find({ videoID })
    res.status(200).json(commentList)
  }
  catch (e) {
    res.status(500).json({ message: 'internal server error' })
  }
});

// Method POST Submit CommentList to add a comment in database
commentListRouter.post('/submit-comment', async (req, res) => {
  const { username, commentUser, videoID } = req.body;
  try {
    // check if a comment is same in database
    const existingCommentList = await commentListModels.findOne({ username, commentUser })
    if (existingCommentList) {
      return res.status(409).json({ response: 'Fail', message: "Your comment was added before" })
    }
    const commentList = await commentListModels({
      videoID,
      username,
      commentUser,
      timestamp: Date.now()
    }).save()

    res.status(200).json({ commentList, response: 'Success' })
  }
  catch (e) {
    res.status(500).json({ response: 'Fail', messsage: "internal server error" })
  }
})

// Method DELETE CommentList to delete all Comment in database
commentListRouter.delete('/delete-comment/:videoID', async (req, res) => {
  const { videoID } = req.params;
  try {
    // delete comment by ID
    const deletedComment = await commentListModels.findOneAndDelete({ videoID });

    if (deletedComment) {
      res.status(200).json({ message: "Comment deleted successfully!" })
    }
    else {
      res.status(404).json({ message: "Comment not found!" });
    }
  }
  catch (e) {
    console.log("Error: ", e)
    res.status(500).json({ message: "Internal server error" })
  }
});

export { videoListRouter, productListRouter, commentListRouter }