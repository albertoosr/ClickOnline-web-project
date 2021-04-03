const bcrypt = require('bcryptjs');
const helpers = {};

// ccriptacion
helpers.encriptacion = async (contrasena) => {
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(contrasena, salt);
    return hash;
};

// logeo descriptacion
helpers.descriptacion = async (contrasena, savePassword) =>{
   try {
        return await bcrypt.compare(contrasena, savePassword); 
   } catch (error) {
       console.log(error);
   }
};

module.exports = helpers;