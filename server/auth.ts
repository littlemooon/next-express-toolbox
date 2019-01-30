import { PassportStatic } from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

export function authGoogle(passport: PassportStatic) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
      },
      (token, _, profile, done) => {
        return done(null, {
          profile,
          token,
        })
      }
    )
  )
}
