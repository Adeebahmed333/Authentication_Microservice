const UserService=require('../services/user-service');

const userService=new UserService();

const create =async (req,res)=>
{
    try {
        const response= await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message:"Successfully Created a new User",
            data:response,
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something Went Wrong In Controller Layer",
            data:{},
            success:false,
            err:error
        });
    }
}

module.exports={
    create
}