import passport from 'passport';
import passportConfig from '../configs/passport.config';

// Initialize passport configuration
passportConfig().then(r => console.log("Passport Configured"));

const auth = passport.authenticate('jwt', {session: false, failWithError: true});

export default auth;
