import passport = require('passport');
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../models/user.model';

import logger from '../utils/logger';
import CryptoJS from 'crypto-js';

logger.info("Load into Passport");
const options = {
    jwtFromRequest: (req: { cookies: { [x: string]: string | CryptoJS.lib.CipherParams; }; }) => {
        if (req && req.cookies && req.cookies['token']) {
            try {
                // Decrypt the token from cookies
                const secret = process.env.TOKEN_SECRET || '';
                const bytes = CryptoJS.AES.decrypt(req.cookies['token'], secret);
                return bytes.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                logger.error("Error decrypting token:", error);
                return null;
            }
        }
        return null;
    },
    secretOrKey: process.env.JWT_SECRET || '',
};

const passportConfig = async() => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.userId);

            if (!user) {
                // Không tìm thấy user
                return done(null, false);
            }

            // Tìm thấy user, xác thực thành công
            return done(null, user);
        } catch (error) {
            // Lỗi trong quá trình truy vấn
            logger.error("Authentication error:", error);
            return done(error, false);
        }
    }));

    // Đặt serialize và deserialize ở ngoài
    passport.serializeUser((user: Express.User & { id?: string }, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            done(null, user as Express.User);
        } catch (err) {
            done(err);
        }
    });
};

export default passportConfig;