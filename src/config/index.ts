require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
    port: parseInt(process.env.PORT) || 5050, // PORT
    dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/', // Mongo URI
    dbName: process.env.MONGODB_NAME, // Database Name
    jwtSecret: process.env.JWT_SECRET, // JWT Secret
    awsID: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key
    awsKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Access Key
    awsRegion: process.env.AWS_DEFAULT_REGION, // AWS Region
    logs: {
        level: process.env.LOG_LEVEL || 'silly', // Logger Level
    },
    sphere: {
        urls: {
            problem: `https://${process.env.SPHERE_ACCOUNT_ID}.problems.sphere-engine.com/api/v4`,
            compile: `https://${process.env.SPHERE_ACCOUNT_ID}.compilers.sphere-engine.com/api/v4`,
        },
        tokens: {
            problem: process.env.SPHERE_PROBLEM_API_KEY,
            compile: process.env.SPHERE_COMPILERS_API_KEY,
        },
    },
    api: {
        prefix: '/api', // API Prefix
    },
}
