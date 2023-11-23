const express = require("express");
const cors = require("cors");
const { connectToServer } = require("./src/utilities/connectToServer");
const authRoutes = require("./src/routes/authRoutes");


require("dotenv").config();
const port = process.env.PORT || 5000;




const app = express();

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());



app.use("/auth", authRoutes)









app.options("*", cors(corsConfig));

connectToServer((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(port)
            console.log(`listening on port  ${port}`);
        });
    }
    else {
        console.log(err)
    }
})


app.all("*", (req, res) => {
    res.send("no route found")
})


app.get("/", (req, res) => {
    res.send("hello world");
});
