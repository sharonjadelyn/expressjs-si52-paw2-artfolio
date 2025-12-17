import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    image: {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps : true
})

const ArtworkModel = mongoose.model("artworks", ArtworkSchema)

export default ArtworkModel;