const express = require('express')
const router = express.Router()

const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} = require('../../controllers/twibbon/campaign')

router
  .route("/")
  .get(getCampaigns)
  .post(createCampaign)

router
  .route("/:id")
  .get(getCampaign)
  .patch(updateCampaign)
  .delete(deleteCampaign)

module.exports = router