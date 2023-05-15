const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const collectionSchema = new Schema(
  {
    ownerId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    coverImgSrc: {
      type: URL,
    },

    shortDescription: {
      type: String,
      required: true,
    },
    collectionItems: {
      type: Array,
    },
    favourites:{
        type:Array
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;