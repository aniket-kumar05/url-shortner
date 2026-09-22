import express from "express";
import { urlShortController, getUrlController, deleteUrl, getAllUrls } from "../controller/url.controller.js";


const router = express.Router();

router.post("/", urlShortController);
router.get("/", getAllUrls)
router.get("/:code", getUrlController);
router.delete("/:id", deleteUrl);
export default router