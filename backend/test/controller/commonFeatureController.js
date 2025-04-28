import expressAsyncHandler from "express-async-handler";
import { Feature } from "../model/featureModel.js";


export const addFeatureImage = expressAsyncHandler(async (req, res) => {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
});

export const getFeatureImages = expressAsyncHandler(async (req, res) => {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
});