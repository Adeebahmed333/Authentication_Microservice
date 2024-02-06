const jwt=require('jsonwebtoken');
const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverConfig');
const bcrypt=require('bcrypt');
class UserService{
constructor()
{
    this.userRepository=new UserRepository();
}
 async create(data)
 {
    try {
        const user=await this.userRepository.create(data);
        return user;
        
    } catch (error) {
        console.log("Something Went Wrong In Service Layer");
        console.log(error);
    }
 }
    createToken(user) {
       try {
        const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
        return result;
       } catch (error) {
        console.log("Something Went Wrong In Token Creation");
        console.log(error);
       }
    }
    verifyToken(token)
    {
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
        console.log("Something Went Wrong In Token Validation");
        console.log(error);
        }
    }
    checkPass(userInputPlainPass,encryptedPass)
    {
     try {
        return bcrypt.compareSync(userInputPlainPass,encryptedPass);
     } catch (error) {
        console.log("Something Went Wrong In Password Checking");
        console.log(error);
        
     }
    }
}
module.exports=UserService;