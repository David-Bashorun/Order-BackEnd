import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    auto: true,   // auto-generate
  },
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   verificationToken: String,
   verifiedAt: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  });

  UserSchema.pre('save', async function(){
    console.log('user is being saved');
    
  })


// ✅ This avoids OverwriteModelError on hot reload
const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;
