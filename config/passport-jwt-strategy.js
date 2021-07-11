const passport = require('passport');
const Jwtstartegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

passport.use(new Jwtstartegy(opts, function(jwtPayload,done) {

    User.findById(jwtPayload._id, function(err,user) {
        if (err) {console.log('Error in finding uers from JWT',err); return;}

        if (user) {
            return done(null,user);
        } else {
            return done(null,false);
        }
    });

}))

module.exports = passport;