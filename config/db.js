const mongoose = require("mongoose");

const conectardb = async() =>{
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://jjoortiz:root@cluster0.ev02zi3.mongodb.net/?retryWrites=true&w=majority",{
                useNewUrlParser: true,
                useUnifiedTopology : true,
            }
        );
        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`Mongodb conectado en: ${url}`);
        
    } catch (error) {
        console.log(`error:${error.message}`);
        process.exit(1);
    }
}

module.exports = conectardb;