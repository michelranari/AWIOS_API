const express = require('express')
const app = express()
const cors = require('cors')
const users = require('./users')
const port = 3000

const logInfo = (req, res, next) => {
    console.log('[INFO]', '(' + new Date().toLocaleString() +')', req.method, req.url, 'from', req.hostname)
    next()
}

app.use(cors())
app.use(express.json())
app.use(logInfo)
app.use('/users',users)
app.listen(port, () => console.log(`App listening on port ${port}`))

const db = {
    users : [
        { id : 1, pseudo : 'michel', mdp : 'michelmdp', mail : 'michel@gmail.com' },
        { id : 2, pseudo : 'lucas', mdp : 'lucasmdp', mail : 'lucas@gmail.com' }
    ]
}
