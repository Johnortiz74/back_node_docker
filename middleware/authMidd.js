const jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
    //lee el token desde los header o desde postman
    const token = req.header("x-auth-token");
    //console.log(token);

    //revisar si no hay token
    if(!token){
        return res.status(400).json({msg : "no hay token"});
        
    }
    //validar token
    try {
        const cifrado = jwt.verify(token,process.env.SECRETA)
        req.usuario = cifrado.usuario;
        //console.log(cifrado.usuario);
        next();       
    } catch (error) {
        res.status(400).json({msg:"token no valido"});  
    }  
}
