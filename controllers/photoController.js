import Photo from "../models/photoModel.js";

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({
      succeded: true,
      photo,
    });
  } catch (err) {
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.status(200).json({
      succeded: true,
      photos,
    });
  } catch (err) {
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

export { createPhoto, getAllPhotos };
