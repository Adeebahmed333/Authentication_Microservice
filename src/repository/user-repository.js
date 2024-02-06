const {User}=require('../models/index');

class UserRepository{

    async create(data)
    {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something Went Wrong In Repo Layer");
            console.log(error);
        }
    }
    async destroy(userId)
    {
        try {
            await User.destroy({
                where:{
                    id:userId
            }});
            return true;
        } catch (error) {
            console.log("Something Went Wrong In Repo Layer");
            console.log(error);
        }
    }
    async getById(userId)
    {
        try {
            const user=await User.findByPk(userId,{
                attributes:['email','id']//to get specific attributes
            });
            return user; 
        } catch (error) {
            console.log("Something Went Wrong In Repo Layer");
            console.log(error);
        }
    }

    async getByEmail(userEmail)
    {
        try {
            const user=await User.findOne({
                where:{
                    email:userEmail
                }
            });
            return user;
        } catch (error) {
            onsole.log("Something Went Wrong In Repo Layer");
            console.log(error);
        }
    }
}

module.exports=UserRepository;