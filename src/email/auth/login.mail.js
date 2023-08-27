import transport from "../../config/nodeMailer.js";

const loginEmail= ({name,email})=>{

    transport.sendMail({
        from:"chusama329@gmail.com",
        to: email,

        subject:"login",
        html:`Welcome to test email ${name}`
    }),
    (err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(res,"Getting Response");
        }
    }

}

export default loginEmail;