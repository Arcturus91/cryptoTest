const {Schema, model} = require("mongoose") ;


const userSchema = new Schema ( {
firstname : {type: String, required: true},
lastname : {type: String},
age:Number,
})

const User = model('User', userSchema);
module.exports=User

