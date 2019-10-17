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
    },

    login: function(req,res){
        const {username, password} = req.body;
        const db = req.app.get("db");
        db.login(username).then(user =>{
            let hash = user[0].password
            bcrypt.compare(password, hash).then(areSame =>{
                if(areSame){
                    req.session.user ={
                        id:user[0].id,
                        username
                    }
                    res.status(200).json(req.session.user)
                }else{
                    res.status(401).json({
                        error:"Username or password Incorect"
                    })
                }
            })
        })
    },
    logout: function (req,res){
        req.session.destroy();
        return res.sendStatus(200)
    }
}
