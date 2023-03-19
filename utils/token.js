const token= function(){
    const yourToken= jwt.sign({
        id:this._id,
        name:this.name,
        email:this.email,
        password:this.password
    },process.env.jwtPrivateKey,{expiresIn:'10d'})
    return yourToken;
};