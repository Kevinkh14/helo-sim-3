const bcrypt = require ('bcryptjs')


module.exports ={
    register : function(req, res){
        const {username, password, avatar} = req.body
        const db = req.app.get('db');
        bcrypt.hash(password, 12).then(hash =>{
            db.register(username, hash, avatar).then(()=>{
                req.session.user ={
                    username,
                    avatar
                }
                res.status(200).json(req.session.user)
            })
        })
    }
}
