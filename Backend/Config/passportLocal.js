const LocalStrategy = require('passport-local').Strategy;
const { session } = require('passport');
const { usersModel } = require('../Models/Users.model');
const bcrypt = require('bcrypt');

exports.passportLocal = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email', session: false }, async (email, password, done) => {

        try {
            let user = await usersModel.findOne({ email: email });
            if (!user) {

                return done(null, false);
            }
            let isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log("not matched")
                return done(null, false);
            }
            return done(null, user);

        } catch (err) {

            console.log(err);
            return done(err, false);
        }
        


    }));
}




