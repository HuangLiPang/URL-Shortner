const mongoose = require("mongoose");
const mongoURI = require("../config/constants").mongoURI;

const { Schema } = mongoose;
const urlShortenSchema = new Schema(
    {
        originalUrl: String,
        uniquePath: String,
        shortUrl: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        collection: "shortener",
    }
);

exports.initializer = function () {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true);
    mongoose
        .connect(mongoURI, {
            keepAlive: true,
            reconnectTries: Number.MAX_VALUE,
            useMongoClient: true,
        })
        .then((connection) => {
            connection.db.dropDatabase();
        });

    mongoose.model("shorten", urlShortenSchema);
};
