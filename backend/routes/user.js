const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const JWT_SECRET = require("../config");
const router = express.Router();

const signupSchema = zod.object({
    userName: zod.string(),
    firstName: zod.string(),
    LastName: zod.string(),
    password: zod.string()
})

router.use(express.json());

router.post("/signup", async function (req, res, err) {
    const body = req.body;

    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.json({
            message: "Incorrect Inputs"
        })
    }

    const dbUser = User.findOne({
        userName: body.userName
    })

    if (dbUser._id) {
        return res.json({
            message: "Duplicate User Found"
        })
    }

    const newUser = await User.create(body);
    const token = jwt.sign({
        userId: newUser._id
    }, JWT_SECRET)

    return res.json({
        message: "User Created Successsfully",
        token: token
    })
})

router.get("/signin", function (req, res, err) {

})

module.exports = router;

