module.exports = {
    http: {
        PORT: 8082
    },
    http2: {
        PORT: 8081,
        GraphqlPath: '/graphql'
    },
    mongodb: {
        HOST:     '192.168.187.140',
        PORT:     27017,
        DB:       'UserApple'
    },
    jwt: {
        data: ["name", "authority", "secret", "passwd"],
        options: {
            expiresIn: 60 * 60 * 24,
        }
    },
    redis: {
        HOST: "192.168.187.140",
        PORT: 6379,
    }
}