const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
     collectionId:[{
        type:Schema.Types.ObjectId,
        ref: 'Collection'
    }],
    id:{
      type:String,
    },
    title: {
      type: String,
      required: true,
    },
    itemSrc: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;