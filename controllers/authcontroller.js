const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: "variables.env"})


exports.autenticarUsuario = async(req, res) =>{
    const {password, email} = req.body;

    try {
        //revisar que usuario este registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(404).json({msg:"El usuario no existe"});
            
        }

        //revisar el password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        
        if (!passwordCorrecto) {
            return res.status(400).json({msg: "password incorrecto"});
        }
        
        // console.log("usuario ingreso");
        // si todo es correcto : crear y firmar un token
        const payload ={
            usuario: {id : usuario.id},
        };
        
        //res.json(payload);
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: '30d',//'1d','1m'
            },
            (error,token) =>{
                if(error) throw error;
                //mensaje de confirmacion
                res.json({token});
            });

    } catch (error) {
        console.log(error);
        
    }
}

exports.usuarioAutenticado = async(req, res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        res.status(500).json({msg: "Hubo un error"});
    }
}