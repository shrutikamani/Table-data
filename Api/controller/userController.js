import User from "../Model/userModel.js";


// create UserApi
export const create = async (req, res)  => {
    try {
        const userData = new  User(req.body);
        if (!userData) {
            return  res.status(404).json({message: "user data not found"});
        }
        const savedData = await userData.save();
        res.status(200).json(savedData);


    } catch (error) {
        res.status(500).json({error: error});
    }
};


// get all users
export const getAll = async (req, res) => {
    try {
      
        const userData = await User.find({ name: { $regex: /^[A-Z]+$/, $options: 'i' } })
        .sort({ name: 1 }); 

        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "User data not found", data: userData });
        }

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//get one user
export const getOne = async(req , res) =>{
    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(userExist);

    } catch (error) {

        res.status(500).json({error: error});
        
    }
}


//update user
export const update = async (req, res) => {
    try {

    const id = req.params.id;

  let userExist = await User.findByIdAndUpdate(id,req.body,{new:true})

  if(!userExist) return res.json({message:'Invalid Id'})

  res.json({ message: "Product has been updated", userExist });

} catch (error) {

            res.status(500).json({error: error});
            
   }
}

//delete user
export const deleted= async (req, res) => {
    try {
        
    const id = req.params.id;

  let userExist = await User.findByIdAndDelete(id)

  if(!userExist) return res.json({message:'Invalid Id'})

  res.json({ message: "user has been deleted",  deleted: userExist });
  
} catch (error) {

    res.status(500).json({error: error});
    
}
}; 