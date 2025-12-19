import CommentModel from "../models/commentModel.js";
import mongoose from "mongoose";

// GET komentar per artwork
export const getCommentsByArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artworkId)) {
      return res.status(400).json({ message: "ID artwork tidak valid" });
    }

    const comments = await CommentModel.find({ artwork: artworkId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Daftar komentar",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil komentar",
      error: error.message,
    });
  }
};

// CREATE komentar
export const addComment = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Komentar tidak boleh kosong" });
    }

    const comment = await CommentModel.create({
      artwork: artworkId,
      user: req.user.user_id,
      content,
    });

    res.status(201).json({
      message: "Komentar berhasil ditambahkan",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan komentar",
      error: error.message,
    });
  }
};
