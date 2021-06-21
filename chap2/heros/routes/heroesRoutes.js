const express = require("express")
const router = express.Router()

const { sendAllHeros, addHeros, sendHeroByName, deleteHeros, updateHeros, sendPowersByName, addPowers, deletePowers } = require('../controllers/heroesControllers')

const { transformName, isNameHeroValid } = require('../middlewares/heroesMiddlewares')


router.get("/", sendAllHeros)

router.post("/", transformName, addHeros)

router.get("/:name", sendHeroByName)

router.delete("/:name", isNameHeroValid, deleteHeros)

router.put("/:name", isNameHeroValid, updateHeros )

router.get("/:name/powers", sendPowersByName)

router.post("/:name/powers", addPowers)

router.delete("/:name/power/:power", isNameHeroValid, deletePowers)

module.exports = { heroesRoutes : router }