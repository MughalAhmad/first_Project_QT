const mongoose = require ("mongoose");

const dataBaseConnection=()=>{
    mongoose.connect("mongodb://localhost:27017/Store",{ useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{
    console.log(`mongoDB connected ${data.connection.port}`)
}).catch((err)=>{
    console.log(err)
})
}
module.exports = dataBaseConnection