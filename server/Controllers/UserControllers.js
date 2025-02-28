const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt')

const register = async (req, res,next) => {
    try {
        const { username, email, password,phoneno } = req.body;
        const isUserExist = await User.findOne({username});
        if(isUserExist){
            return res.status(400).json({ message: "Username already taken" ,status:false});
        }
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" ,status:false});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phoneno
        }); 
        await user.save();
        res.status(201).json({ message: "User registered successfully",user ,status:true});

    }catch(e){
        res.status(400).json({ message: e ,status:false});
    }
}
const login = async (req, res,next) => {
    
        const {email, password} = req.body;
        let Usercheck = await User.findOne({ email });
        if (!Usercheck) {      
            return res.status(400).json({ message: "User doesnt exist" ,status:false});
        }

        const isPasswordCorrect = await bcrypt.compare(password, Usercheck.password);

        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Password is incorrect" ,status:false});
        }
        res.status(201).json({ message: "User Signin successfully",Usercheck ,status:true});
        next()
}

module.exports = {
    register,login
}