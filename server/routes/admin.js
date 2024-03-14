const router = require("express").Router();
const User = require("../models/user.model.js");

router.get("/api/admin/users", async (req, res, next) => {
    const { email, password } = req.body;

    // if (!email || !password || email === '' || password === '') {
    //     next(errorHandler(400, 'All fields are required'));
    // }

    try {
       
 const users = await User.findOne({}, {password: 0 });

 if(!users || !users.length === 0) {
    return res.status(404).json({ message: 'No users found '})
 }

return res.status(200).json(users);
            
    } catch (error) {
        next(error);
    }
});

module.exports = router;