const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const itemSchema = new Schema(
  {
     collectionId:{
        type:String,
    },
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