import mongoose from "mongoose";

const productListSchema = new mongoose.Schema(
  {
    videoID: {
      type: mongoose.Schema.Types.String,
      ref: "videolist",
      required: true
    },
    productID: {
      type: String,
      required: true
    },
    linkProduct: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  }
)

const productlist = mongoose.model('productlists', productListSchema)

export default productlist