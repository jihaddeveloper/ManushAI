//  Author: Mohammad Jihad Hossain
//  Create Date: 29/01/2021
//  Modify Date: 29/05/2019
//  Description: Passport config file


//  Library import
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const secret = require('../config/secret');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret.secretKey;


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    await User.findById({
            _id: jwt_payload.id
        })
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
}));
