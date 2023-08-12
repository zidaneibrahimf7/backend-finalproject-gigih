import mongoose from 'mongoose'

const commentListSchema = new mongoose.Schema(
  {
    videoID: {
      type: mongoose.Schema.Types.String,
      ref: "videolist",
      required: true
    },
    username: {
      type: String,
      required: true
    },
    commentUser: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
  }
)

const commentList = mongoose.model('commentlists', commentListSchema)

export default commentList;