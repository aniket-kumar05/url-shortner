import UrlModel from "../models/url.models.js";
import { generateCode } from "../utils/generateCode.js";

export const urlShortController = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "url is required",
      });
    }

    if (
      !originalUrl.startsWith("http://") &&
      !originalUrl.startsWith("https://")
    ) {
      return res.status(400).json({
        message: "url should start with http:// or https://",
      });
    }

    if (originalUrl.length > 2048) {
      return res.status(400).json({
        message: "url is too long",
      });
    }

    const code = generateCode();

    const newUrl = await UrlModel.create({
      originalUrl,
      shortCode: code,
    });

    const shortUrl = `http://localhost:5000/api/url/${newUrl.shortCode}`;

    return res.status(201).json({
      message: "Url is shortened successfully",
      data: {
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
        shortUrl,
      },
    });

  } catch (error) {
    console.log("error in shorten url", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllUrls = async (req, res) => {
  try {
      const allUrl = await UrlModel.find()
      return res.status(200).json({
        message: "fetched all url",
        data: {
          allUrl
        }
      })
  } catch (error) {
    console.log("error in fetching url", error)
  }
}
// export const getUrlController = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const getUrl = await UrlModel.findOne({ shortCode: code });
//     if (!getUrl) {
//       return res.status(404).json({
//         message: "url not found",
//       });
//     }
//     // return res.status(200).json({
//     //   message: "url is Shortened susessfully",
//     //   data: {
//     //     getUrl
//     //   }
//     // });

//     await UrlModel.findOneAndUpdate(
//       { shortCode: code },
//       { $inc: { clickCount: 1 } },
//     );

//     //  console.log(clickCount);
//     const updatedUrl = await UrlModel.findById(getUrl._id);

//     console.log("Short code:", updatedUrl.shortCode);
//     console.log("Click count:", updatedUrl.clickCount);

//     return res.redirect(302, updatedUrl.originalUrl);
//   } catch (error) {
//     console.log("error in shorten url", error);
//   }
// };

export const getUrlController = async (req, res) => {
  try {
    console.log("Redirect request received");
    console.log("Code:", req.params.code);

    const { code } = req.params;

    const updatedUrl = await UrlModel.findOneAndUpdate(
      { shortCode: code },
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    console.log("Database result:", updatedUrl);

    if (!updatedUrl) {
      return res.status(404).json({
        message: "url not found",
      });
    }

    console.log("Click count:", updatedUrl.clickCount);

    return res.redirect(302, updatedUrl.originalUrl);

  } catch (error) {
    console.log("error in redirect", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const deleteUrl = async(req, res) => {
  try {
    const {id} = req.params;
    const url = await UrlModel.findById(id);
    if(!url){
      return res.status(404).json({
        message: "url not found",
      });
    }

    await UrlModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "url deleted successfully",
      data: url
    })
  } catch (error) {
    console.log("error in shorten url", error);
  }
}