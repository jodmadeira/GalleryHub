const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
      imgSrc:{
      type: String,
    },
    id:{
      type:String
    },  
    isCreator: {
      type: Boolean,
    },
    ownedCollections: {
      type: Array,
    },
    follows: {
      type: Array,
    },
    favourites: {
      type: Array,
    },
    following: {
      type: Array,
    },
    bio:{
        type: String,
    }
  },
  { // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
