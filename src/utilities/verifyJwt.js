const jwt = require('jsonwebtoken');

const verifyJwt = async () =>{
    try {
        let header = await req.header("Authorization")
        if (!header) {
            return res.status(400).json({ message: "Something went wrong" })
        }
        else {
            const token = header.split(" ")[1]
            const verifyToken = jwt.verify(token, "verify-token-should-be-in-env-file")
            req.user = verifyToken;
            next()
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = verifyJwt;