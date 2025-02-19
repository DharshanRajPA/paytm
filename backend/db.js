const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/paytm-db")
const user = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: String
})

const User = new mongoose.model("User", user)

module.exports = {
    User
}
