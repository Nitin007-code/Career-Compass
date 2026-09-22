const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/*
  User Schema :-
  Stores the minimum information required to identify and authenticate a Career-Compass user.
*/

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must contain at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must contain at least 8 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);


/*
  Hash password before saving.
*/
userSchema.pre("save", async function () {
  // If password has not changed, don't hash it again.
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});


/*
  Compare entered password with the hashed password stored in MongoDB.
*/
userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return bcrypt.compare(
    enteredPassword,
    this.password
  );
};


const User = mongoose.model("User", userSchema);

module.exports = User;