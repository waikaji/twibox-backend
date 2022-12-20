const express = require('express')
const router = express()

const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  updateImageCampaign,
  searchCampaign,
  addDownloader,
  getMyCampaign,
  deleteCampaign,
} = require('../../controllers/twibbon/campaign')

const {
  authenticateToken,
  regenerateAccessToken,
} = require("../../middleware/auth")

router.get("/", getCampaigns)
router.post("/", authenticateToken, createCampaign)

router.get("/search", searchCampaign)

router.patch("/downloader/:id", addDownloader)

router.get("/mycampaign/:id_user", authenticateToken, getMyCampaign)

router.get("/:id", getCampaign)
router.patch("/:id", authenticateToken, updateCampaign)
router.delete("/:id", authenticateToken, deleteCampaign)

router.patch("/image/:id", authenticateToken, updateImageCampaign)

module.exports = router