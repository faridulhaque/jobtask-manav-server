const bcrypt = require('bcrypt');
const { getDb } = require('../utilities/connectToServer');
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    try {
        const db = getDb();
        const collection = db.collection("users")
        const name = req.body.name
        const email = req.body.email;
        const passkey = req.body.password;


        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(passkey, salt)
        const existed = await collection.findOne({ email: email });

        if (!existed?._id) {
            const result = await collection.insertOne({ name, email, password });
            res.status(200).json(result)
        }

        else if (existed._id) {
            res.status(409).json({ msg: "Already Exists" })
        }

    } catch (error) {
        res.status(400).send(error);
    }
}

const login = async (req, res, next) => {
    const db = getDb();
    const collection = db.collection("users")
    const email = req.body.email;
    const password = req.body.password;

    const existed = await collection.findOne({ email: email });
    if (existed?._id) {
        const isMatched = await bcrypt.compare(password, existed?.password)

        if (!isMatched) {
            return res.status(404).json({ msg: 'Password did not match' })
        }
        else {
            const user = {
                email: existed.email,
                name: existed?.name,
                _id: existed._id,
            }
            const token = jwt.sign({ id: user._id }, "verify-token-should-be-in-env-file")
            res.status(200).json({ user, token })
        }

    }
    else {
        return res.status(404).json({ msg: 'User not found' })

    }
}


module.exports = { register, login }
