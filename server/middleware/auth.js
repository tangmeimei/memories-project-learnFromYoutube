
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodeData;
        if (token && isCustomAuth) {
            console.log('>>>>>>>>>>>>>>>');
            decodeData = jwt.verify(token, 'test');
            console.log(decodeData)
            req.userId = decodeData?.id;
        } else {
            console.log('********************');
            decodeData = jwt.decode(token);
            console.log(decodeData)
            req.userId = decodeData?.sub;
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

export default auth;