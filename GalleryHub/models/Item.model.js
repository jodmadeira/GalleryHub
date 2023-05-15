const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const collectionSchema = new Schema(
  {
     collectionId:{
        type:String,
    },
    title: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: URL,
      required: true
    },
    shortDescription: {
      type: String,
      required: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;