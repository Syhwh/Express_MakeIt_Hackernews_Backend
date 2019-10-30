const path = require('path');
const config = {
    port: process.env.PORT || 3000,
    static: path.join(__dirname, '../../public'),
    mongoose: {
        db: process.env.MONGO_URI,
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        },
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET
        
    },

}
module.exports = config;