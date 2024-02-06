const jwt=require('jsonwebtoken');
const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverConfig');
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
 
}
module.exports=UserService;