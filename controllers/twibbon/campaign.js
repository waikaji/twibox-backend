const Campaign = require("../../models/twibbon/campaign")
const path = require("path")

const getCampaigns = async (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 12;
  const offset = limit * page;
  try{
    const totalRows = await Campaign.countRows()
    const totalPage = Math.ceil(totalRows[0][0].namesCount / limit)
    const [campaigns, _] = await Campaign.findAll(offset, limit)

    res.status(200).send({
      campaigns:campaigns,
      page: page,
      limit: limit,
      totalRows: totalRows[0][0].namesCount,
      totalPage: totalPage
    })
  }catch(error) {
    console.log(error)
    next(error)
  }
}

const createCampaign = async (req, res, next) => {
    if(req.files === null) return res.status(400).json({message: "No File Uploaded"})
    const { id_user, title, description } = req.body
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/frame/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({message: "Invalid Images"})
    if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"})

    file.mv(`./public/frame/${fileName}`, async(err)=> {
      if(err) return res.status(500).json({message: err.message})
      try{
        let campaign = new Campaign(id_user, title, description, fileName, url)
        campaign = await campaign.save()
        res.status(201).json({message: "Campaign created successfully"})
      } catch(error) {
        console.log(error)
        next(error)
      }
    })  
}

const getCampaign = async(req, res, next) => {
  try {
    const id = req.params.id
    const [campaigns, _] = await Campaign.findById(id)

    res.status(200).send({campaigns})
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const updateImageCampaign = async(req, res, next) => {
  const id = req.params.id
  if(req.files === null) return res.status(400).json({message: "No File Uploaded"})
  const file = req.files.file
  const fileSize = file.data.length
  const ext = path.extname(file.name)
  const fileName = file.md5 + ext
  const urlImage = `${req.protocol}://${req.get("host")}/frame/${fileName}`
  const allowedType = ['.png', '.jpg', '.jpeg']
  
  if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({message: "Invalid Images"})
  if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"})
  let campaign = new Campaign(image_filename=fileName, url=urlImage)

  file.mv(`./public/frame/${fileName}`, async(err)=> {
    if(err) return res.status(500).json({message: err.message})
    try{
      const [campaign_by_id, _] = await Campaign.findById(id)

      if(campaign_by_id.length) {
        if(campaign_by_id[0].id !== parseInt(id, 10)) {
          res.status(400).send({message: "Failed to update"})
        }else {
          campaign = await campaign.updateImage(parseInt(id,10))
          res.status(201).send({ message: "Campaign updated"})
        }
      } else {
        res.status(400).send({message: "User doesn't exist"})
      }
    } catch(error) {
      console.log(error)
      next(error)
    }
  })  
}

const updateCampaign = async(req, res, next) => {
  try {
    const id = req.params.id
    let { title, description } = req.body
    let campaign = new Campaign("",title, description)
    const [campaign_by_id, _] = await Campaign.findById(id)

    if(campaign_by_id.length) {
      if(campaign_by_id[0].id !== parseInt(id, 10)) {
        res.status(400).send({message: "Failed to update"})
      }else {
        campaign = await campaign.update(parseInt(id, 10))
        res.status(201).send({ message: "Campaign updated"})
      }
    } else {
      res.status(400).send({message: "Cannot find user"})
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
}

const searchCampaign = async(req, res, next) => {
  try{
    const {keyword} = req.query
    const [campaigns, _] = await Campaign.findByKeyword(keyword)
    res.status(200).send({campaigns})
  }catch(error){
    console.log(error)
    next(error)
  }
}

const addDownloader = async(req, res, next) => {
  try {
    const {id} = req.params
    const [campaign, _] = await Campaign.findById(id)
    const count = campaign[0].downloader + 1
    const downloader = await Campaign.updateDownloader(id, count)
    res.status(200).send({message: "downloader add"})
  }catch(error) {
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

const getMyCampaign = async(req, res, next) => {
  try{
    const id_user = req.params.id_user
    const [campaigns, _] = await Campaign.findByIdUser(id_user)

    const getCount = await Campaign.countCampaignByIdUser(id_user)
    const count = getCount[0][0].count

    const getTotal = await Campaign.totalDownloaderByIdUser(id_user)
    const total = getTotal[0][0].total

    res.status(200).send({count: count, total:parseInt(total), campaigns})
  }catch(error) {
    console.log(error)
    next(error)
  }
}

module.exports = { getCampaigns, getMyCampaign, updateImageCampaign, createCampaign, getCampaign, searchCampaign, updateCampaign, addDownloader, deleteCampaign }