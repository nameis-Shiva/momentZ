require("dotenv").config();
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb();

app.listen(3000, (err) =>{
    if(err) return err.message;
    console.log("Server is running on PORT 3000")
})