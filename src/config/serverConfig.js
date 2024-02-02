const dotenv=require('dotenv');

dotenv.config();//calls .env file

module.exports={
    PORT:process.env.PORT
}