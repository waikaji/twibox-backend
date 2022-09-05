const express = require('express')
const router = express.Router()

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

router
  .route("/")
  .get(getCampaigns)
  .post(createCampaign)

router
  .route("/search")
  .get(searchCampaign)

router
  .route("/downloader/:id")
  .patch(addDownloader)

router
  .route("/mycampaign/:id_user")
  .get(getMyCampaign)

router
  .route("/:id")
  .get(getCampaign)
  .patch(updateCampaign)
  .delete(deleteCampaign)

router
  .route("/image/:id")
  .patch(updateImageCampaign)

module.exports = router