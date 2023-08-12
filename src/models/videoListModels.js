import mongoose from "mongoose";

const videoListSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true
    },
    videoID: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    }
  }
)

const videolist = mongoose.model('videolists', videoListSchema);

export default videolist;