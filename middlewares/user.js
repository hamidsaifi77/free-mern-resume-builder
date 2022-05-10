const jwt = require('jsonwebtoken')
const admin = require('../config/firebase-config')

module.exports = {
    isvalid: async (req, res, next) => {

        const token = req.get('Authorization')
        if (!token) {
            return res.json({
                msg: "No token found",
                token: `Your token: ${token}`
            })
        }
        try {
            if (token) {
                jwt.verify(token.split(' ')[1], process.env.JWTKEY, (err, decode) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            msg: "Invalid token found"
                        })
                    } else {
                        req.decode = decode
                        next()
                    }
                })
            } else {
                return res.json({
                    success: 0,
                    msg: "Access denies! Invalid token found."
                })
            }
        } catch (err) {
            console.log(err)
        }
    },

    validlogin: async (req, res, next) => {
        const token = req.get('Authorization')
        if (!token) {
            return res.json({ msg: "No token found" })
        }
        try {
            if (token) {
                const decodeValue = await admin.auth().verifyIdToken(token.split(' ')[1]);
                if (decodeValue) {
                    req.user = decodeValue;
                    return next();
                }
                else {
                    return res.json({ message: 'Un authorize' });
                }
            } else {
                return res.json({
                    msg: "Access denies! Invalid token found."
                })
            }
        } catch (err) {
            res.json({ msg: "Unauthorized" })
        }
    },

    isadmin: async (req, res, next) => {
        const token = req.get('Authorization')
        if (!token) {
            return res.json({
                msg: "No token found",
                token: `Your token: ${token}`
            })
        }
        try {
            if (token) {
                jwt.verify(token.split(' ')[1], process.env.JWTKEY, (err, decode) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            msg: "Invalid token found"
                        })
                    } else {
                        if (decode.role !== 'admin') {
                            return res.json({
                                success: 0,
                                msg: "Invalid request"
                            })
                        } else {
                            req.decode = decode
                            next()
                        }
                    }
                })
            } else {
                return res.json({
                    success: 0,
                    msg: "Access denies! Invalid token found."
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

}
