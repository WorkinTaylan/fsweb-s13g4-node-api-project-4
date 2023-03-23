const model= require("./user-model");

function logger(req, res, next) {
    // SİHRİNİZİ GÖRELİM
    const method=req.method;
    const url=req.originalUrl;
    const timestamp= new Date().toLocaleString();
    console.log(`${timestamp}-- ${method}--${url}`);
    next();
}

function checkSameUserName(req,res,next){
    try{
        const {userName}=req.body;
        const isSame=!!userName&& model.checkIsSame(userName);
        if(isSame)
        res.status(400).json({message:"Aynı userName mevcuttur"});
        else{
            next();
        }
    }catch(error){
        next(error);
    }
}

function validateNewUser(req,res,next){
    try{
        const {userName, password}=req.body;
        if(!userName || !password){
            res.status(400).json({message:"Eksik bilgiler mevcut"})
        }
    else{
        req.user= {userName:userName, password:password};
        next();
        }
    } catch(error){
        next(error)
    }
}

function isValidUser(req,res,next){
    try{
        let user={userName:req.body.userName, password:req.body.password};
        const isExist=model.findUser(user);
        if(!isExist){
            res.status(404).json({message:"Kullanıcı bulunamadı"})
        }else {
            next();
        }
    }catch(error){
        next(error);
    }
}

module.exports={
    logger,
    checkSameUserName,
    isValidUser,
    validateNewUser
}