const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const collectionSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    coverImgSrc: {
      type: String,
    },

    shortDescription: {
      type: String,
      required: true,
    },
    collectionItems: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],
    favourites:[{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;