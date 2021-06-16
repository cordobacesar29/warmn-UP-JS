const mongoose = require("mongoose");

//hacemos la conexion a la base de datos de mongo atlas a traves de mongoose
const conection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('conection to DB succefull');
    } catch (error) {
        console.log('conection to DB Fail',error);
    }
};
module.exports = conection;