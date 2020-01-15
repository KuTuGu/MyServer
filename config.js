module.exports = {
    http: {
        PORT: 80
    },
    http2: {
        PORT: 8080,
        GraphqlPath: '/graphql'
    },
    mongodb: {
        HOST:     '192.168.187.140',
        PORT:     27017,
        DB:       'UserApple'
    },
    jwt: {
        data: ["name", "authority", "passwd"],
        options: {
            expiresIn: 60 * 60,
        }
    },
    redis: {
        HOST: "192.168.187.140",
        PORT: 6379,
    }
}