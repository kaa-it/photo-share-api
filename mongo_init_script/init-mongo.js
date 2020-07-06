// mongodb://astro:Q123456q@127.0.0.1:27017/admin?authSource=astro

db.createUser(
    {
        user: "astro",
        pwd: "Q123456q",
        roles: [
            {
                role: "readWrite",
                db: "astro"
            }
        ]
    }
)
