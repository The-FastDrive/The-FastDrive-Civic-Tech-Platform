import dotenv from 'dotenv';
dotenv.config();

const requiredEnvs = [
    'SERVER_HOST',
    'MONGO_URI',
    'PORT',
];

requiredEnvs.forEach((key)=>{
    if(!process.env[key]){
        return console.log(`Required Environment key missing: ${key}`);
    }
});

const envConfig = {
    PORT: process.env.PORT,
    SERVER_HOST: process.env.SERVER_HOST,
    MONGO_URI: process.env.MONGO_URI
};

export default envConfig;