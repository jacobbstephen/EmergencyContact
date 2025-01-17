const mongoose = require("mongoose");

const emergencyContactsSchema = new mongoose.Schema({
  username: {
    type:String,
  },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//     required: [true, "User is required"],
//   },

  contacts: [
    {
      name: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
    },
  ],
});

const emergencyContacts = mongoose.model(
  'emergencyContacts',
  emergencyContactsSchema
);
module.exports = emergencyContacts;
