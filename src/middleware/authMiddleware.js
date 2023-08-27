import jwt from "jsonwebtoken";

const loginAuthorization = async (req, res, next) => {
    try{
        let header=req.headers.authorization;
        console.log(header)
        if(!header){
            return res.status(401).json({
                message: "No token provided. please try again"
            })
        }

        let token=header.replace("Bearer ", "");
       
        let decoded=jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decoded);
        
        req.user=decoded;
        next();

    } catch(err){
        return res.status(401).json({
            message: "Invalid token provided. please try again",err
    })
}
};

export default loginAuthorization;
