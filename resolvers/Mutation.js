const { authorizeWithGithub } = require('../lib')

module.exports = {
    postPhoto(parent, args) {
        let newPhoto = {
            id: _id++,
            ...args.input,
            created: new Date()
        }

        photos.push(newPhoto)

        return newPhoto
    },

    async githubAuth(parent, { code }, { db }) {
        console.log('client_id: ', process.env.CLIENT_ID)
        console.log('client_secret: ', process.env.CLIENT_SECRET)

        let {
            message,
            access_token,
            avatar_url,
            login,
            name
        } = await authorizeWithGithub({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code,
        })

        if (message) {
            throw new Error(message)
        }

        let latestUserInfo = {
            name,
            githubLogin: login,
            githubToken: access_token,
            avatar: avatar_url
        }

        const { ops:[user] } = await db
            .collection('users')
            .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true })

        return { user, token: access_token }
    }
}