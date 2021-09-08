const express = require('express')
const cors = require('cors')
const ctrl = require('./controller')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/character/', ctrl.getPlayers)
app.post('/api/character/', ctrl.addPlayer)
app.delete('/api/character/:id', ctrl.removePlayer)
app.put('/api/character/:id', ctrl.updateHealth)

app.get('/api/monsters/', ctrl.obtainMonsters)
app.post('/api/monsters/', ctrl.makeMonster)
app.delete('/api/monsters/:id', ctrl.destroyMonster)
app.put('/api/monsters/:id', ctrl.changeHp)

app.listen(4545, ()=> console.log(`Up on 4545`))