const bcrypt= require('bcryptjs');

const hashPassword= async function(password){
    const salt=bcrypt.genSalt(10);
    this.password= bcrypt.hash(this.password,salt)
    console.log('Password hashed')
    next();
};
