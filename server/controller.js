const players = require('./player.json')
const monsters = require('./monster.json')
const { rawListeners } = require('process')
let playerId = 1
let monsterId = 1

module.exports = {
    getPlayers: (req, res) => {
        res.status(200).send(players)
    },
    addPlayer: (req, res) => {
        let { name, health} = req.body
        let newPLayer = {
            id: playerId,
            name,
            health
        }

        players.push(newPLayer)
        res.status(200).send(players)
        playerId++
    },
    removePlayer: (req, res) => {
        let index = players.findIndex(elem => elem.id === +req.params.id)
        players.splice(index, 1)
        res.status(200).send(players)
    },
    updateHealth: (req, res) => {
        let {id} = req.params
        let {type} = req.body

        let index = players.findIndex(elem => elem.id === +id)
        if(players[index].health === 0 && type === "minus"){
            res.status(400).send('Aleady dying')
        } else if (type === "plus"){
            players[index].health++
            res.status(200).send(players)
        }else if (type === 'minus'){
            players[index].health--
            res.status(200).send(players)
        }else {
            res.status(400).send("It didn't work")
        }
    },
    obtainMonsters: (req, res)=> {
        res.status(200).send(monsters)
    },
    makeMonster: (req, res)=> {
        let {name, health} = req.body
        let newMonster = {
            id: monsterId,
            name,
            health
        }

        monsters.push(newMonster)
        res.status(200).send(monsters)
        monsterId++
    },
    destroyMonster: (req, res)=> {
        let index = monsters.findIndex(elem => elem.id === +req.params.id)
        monsters.splice(index, 1)
        res.status(200).send(monsters)
    },
    changeHp: (req, res)=> {
        let {id}=req.params
        let {type}=req.body

        let index = monsters.findIndex(elem =>elem.id === +id)

        if(monsters[index].health === 0 && type === 'minus'){
            res.status(400).send("Health can't go lower")
        } else if (type === 'plus'){
            monsters[index].health++
            res.status(200).send(monsters)
        } else if (type === 'minus'){
            monsters[index].health--
            res.status(200).send(monsters)
        } else {
            res.status(400).send("It didn't work")
        }
    }
}