const express = require('express');
const router = express.Router();

router.post('/authenticate', (req,res) => {
    const pseudo = req.body.pseudo
    const mdp = req.body.mdp
    const result = db.users.filter( (user) => user.pseudo == pseudo && user.mdp == mdp)
    if(result.length == 0) { 
        res.sendStatus(404)
    } else {
        res.status(200).json(result[0])
    }
})

const db = {
    users : [
        { id : 1, pseudo : 'michel', mdp : 'michelmdp', mail : 'michel@gmail.com' },
        { id : 2, pseudo : 'lucas', mdp : 'lucasmdp', mail : 'lucas@gmail.com' }
    ]
}

module.exports = router