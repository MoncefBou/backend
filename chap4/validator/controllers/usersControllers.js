const expressValidator = require("express-validator");

const addUser = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({message : "There was a problem with your form, please correct this"});
        } else {

            res.json({message : 'OKKKK !!!'})


        }
    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })

    }
}

module.exports = { addUser }