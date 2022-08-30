const Campaign = require("../../models/twibbon/campaign")

const getCampaigns = async (req, res, next) => {
  try{
    const [campaigns, _] = await Campaign.findAll()

    res.status(200).send({campaigns})
  }catch(error) {
    console.log(error)
    next(error)
  }
}

const createCampaign = async (req, res, next) => {
  try{
    const { id_user, title, description, image_filename } = req.body
    let campaign = new Campaign(id_user, title, description, image_filename)
    campaign = await campaign.save()
    
    res.status(201).send({ message: "Campaign created"})
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const getCampaign = async(req, res, next) => {
  try {
    const id = req.params.id
    const [campaign, _] = await Campaign.findById(id)

    res.status(200).send({campaign})
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const updateCampaign = async(req, res, next) => {
  try {
    const id = req.params.id
    const { id_user, title, description, image_filename } = req.body
    let campaign = new Campaign(id_user, title, description, image_filename)
    const [campaign_by_id, _] = await Campaign.findById(id)

    if(campaign_by_id[0].id != parseInt(id, 10)) {
      console.log(typeof id)
      res.status(400).send({message: "Failed to update"})
    }else {
      campaign = await campaign.update(parseInt(id, 10))
      res.status(201).send({ message: "Campaign updated"})
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const deleteCampaign = async(req, res, next) => {
  try{
    const id = req.params.id
    const [campaign, _] = await Campaign.delete(id)

    res.status(200).send({message: "Campaign deleted"})
  }catch(error) {
    console.log(error)
    next(error)
  }
}

module.exports = { getCampaigns, createCampaign, getCampaign, updateCampaign, deleteCampaign }