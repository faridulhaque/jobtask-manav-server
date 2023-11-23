const { MongoClient } = require("mongodb");
require("dotenv").config();



const client = new MongoClient("mongodb+srv://faridulhaquemurshed:IYetP5IQNi7E9Az4@cluster0.zpsp4pp.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("manav")
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },

};