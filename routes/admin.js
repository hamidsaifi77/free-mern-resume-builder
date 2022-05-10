const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const { isadmin } = require('../middlewares/user')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')


// creating admin 
router.post('/admin_create', async (req, res) => {
    try {
        const exct = await Admin.findOne({ role: 'admin' })
        if (exct) {
            return res.json({ success: false, msg: "Admin already created", data: exct })
        }
        const hashpassword = await bcrypt.hash(req.body.pass, 10)
        const jsontoken = sign({ email: req.body.email, role: 'admin' }, process.env.JWTKEY, {
        })
        const admin = new Admin({
            mobile: req.body.mobile,
            email: req.body.email,
            pass: hashpassword
        })
        const newadmin = await admin.save()
        newadmin.password = null
        res.json({ admin: newadmin, token: jsontoken, success: true })
    } catch (err) {
        console.log(err)
    }
})

// admin login 
router.post('/admin_login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            return res.json({ success: false, msg: "Wrong credentials" })
        }
        const pass = await bcrypt.compare(req.body.pass, admin.pass)
        if (!pass) {
            return res.json({ success: false, msg: "Wrong credentials" })
        }
        const jsontoken = sign({ role: 'admin', email: req.body.email }, process.env.JWTKEY, {
        })
        res.json({ success: pass, token: jsontoken })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router