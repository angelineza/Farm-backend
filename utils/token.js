const token= function(){
    const yourToken= jwt.sign({
        id:this._id,
        name:this.name,
        email:this.email,
        password:this.password
    },process.env.Secrete,{expiresIn:'1d'})
    return yourToken;
};