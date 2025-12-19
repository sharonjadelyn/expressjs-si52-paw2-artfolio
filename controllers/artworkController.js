import ArtworkModel from "../models/artworkModel.js";
import mongoose from "mongoose";

//READ
export const artworks = async (req,res) => {
    try {
        const artworks = await ArtworkModel.find().populate("createdBy", "username").sort({ createdAt : -1});

        return res.status(200).json({
            message : "Daftar semua Karya Seni",
            data : artworks
        })
    } catch (error) {
        res.status(500).json({
            message : "Terjadi kesalahan pada server",
            error: error.message,
            data : null
        })
    }
}


//CREATE
export const addNewArtwork = async (req,res) => {
    try {
        const { title, description, image, category } = req.body;

        if (!title || !description || !image || !category) {
            return res.status(400).json({
                message: "Semua field wajib diisi",
                data: null
            });
        }

        //Menyimpan user_id pembuat ke database
        const artworks = await ArtworkModel.create({title, description, image, category, createdBy: req.user?.user_id});

        res.status(201).json({
            message: "Berhasil menambahkan karya baru",
            data: artworks,
        });
    } catch (error) {
        res.status(500).json({
        message: "Gagal menambahkan karya seni",
        error: error.message,
        data: null,
        });
    }
};

//DETAIL MOVIE
export const detailArtwork= async (req,res) => {
    try {
        const { id } = req.params;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "ID tidak valid", data: null});
        }

        const artworks = await ArtworkModel.findOne({ _id: id }).populate("createdBy", "username");

        if(!artworks){
            return res.status(404).json({ message: "Karya tidak ditemukan", data: null});
        }

        return res.status(200).json({ message: "Detail Karya", data: artworks});
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        })
    }
}

//UPDATE
export const updateArtwork = async (req,res) => {
    try {
        const { id } = req.params;
        const { title, description, image, category } = req.body;

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "ID tidak valid", data: null });
        }

        //Update hanya jika ID cocok DAN user pembuat cocok
        const updatedArtwork = await ArtworkModel.findOneAndUpdate(
            {
                _id : id,
                createdBy : req.user?.user_id
            },
            {title, description, image, category},
            {new: true}
        );

        if(!updatedArtwork){
            return res.status(404).json({ message: "Karya seni tidak ditemukan atau akses ditolak", data: null})
        }

        return res.status(200).json({
            message: "Berhasil mengupdate karya",
            data: updatedArtwork
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        })
    }
}

//DELETE
export const deleteArtwork = async (req,res) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: "ID tidak valid", data: null});
        }

        //Hapus hanya jika ID cocok DAN user pembuat cocok
        const deletedArtwork = await ArtworkModel.findOneAndDelete({
            _id : id,
            createdBy : req.user?.user_id
        });

        if(!deletedArtwork){
            return res.status(404).json({ message: "Karya tidak ditemukan atau akses ditolak", data: null });
        }

        return res.status(200).json({
                message: "Berhasil menghapus karya",
                data: deletedArtwork
            })

    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error : error.message,
            data : null
        })
    }
}