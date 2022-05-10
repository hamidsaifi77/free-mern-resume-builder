const router = require('express').Router()
const User = require('../models/user')
const { validlogin, isadmin, isvalid } = require('../middlewares/user')
const { sign } = require('jsonwebtoken')
const Razorpay = require('razorpay');
const Setting = require('../models/setting')

// user login 
router.get('/user_login', validlogin, async (req, res) => {
    try {
        const exuser = await User.findOne({ uid: req.user.user_id })
        const jsontoken = sign({ uid: req.user.user_id, mobile: req.user.phone_number, role: 'user' }, process.env.JWTKEY, {
        })
        if (exuser) {
            return res.json({ msg: "User already exist", token: jsontoken })
        } else {
            const user = new User({
                mobile: req.user.phone_number,
                uid: req.user.user_id,
                token: jsontoken
            })
            const newuser = await user.save()
            res.json({ msg: newuser, token: jsontoken })
        }
    } catch (error) {
        res.json({
            msg: error.message
        })
    }
})


// get all users admin 
router.get('/get_all_admin', isadmin, async (req, res) => {
    try {
        const resp = await User.find()
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})

// get user by uid 
router.get('/get_by_uid', isvalid, async (req, res) => {
    try {
        const resp = await User.findOne({ uid: req.decode.uid })
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
    }
})


// patch user 
router.post('/patch_user', isvalid, async (req, res) => {

    try {
        delete req.body.subs_valid
        delete req.body.is_paid
        const resp = await User.findOneAndUpdate({ uid: req.decode.uid }, req.body, { new: true })
        res.json({ success: true, data: resp, msg: "User has been updated" })
    } catch (err) {
        console.log(err)
    }
})


// order a membership 
router.post('/order_membership', isvalid, async (req, res) => {

    try {
        const sett = await Setting.findOne()

        var instance = new Razorpay({
            key_id: sett.rz_id,
            key_secret: sett.rz_secret,
        });
        const msgg = await instance.payments.capture(req.body.rz_payment_id, req.body.amt * 100, "INR")
        if (!msgg) {
            res.json({ success: false, msg: "Something went wrong, Try again" })
            return
        }
        const resp = await User.findOneAndUpdate({ uid: req.decode.uid }, {
            is_paid: true,
            subs_valid: req.body.new_date
        }, { new: true })
        res.json({ success: true, data: resp, msg: "Congo!" })
    } catch (error) {
        console.log(error)
    }
})


// manage subs by admin 
router.post('/mem_by_admin', isadmin, async (req, res) => {
    try {
        const resp = await User.findOneAndUpdate({ uid: req.body.uid }, req.body, { new: true })
        res.json({ success: true, data: resp, msg: "User has been updated" })
    } catch (err) {
        console.log(err)
    }
})

// find paid users length 
router.get('/get_paid_length', async (req, res) => {
    try {
        const resp = await User.find({ is_paid: true })
        res.json({ success: true, data: resp.length })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router