const playerPreview = document.querySelector('#player-preview')
const playerform = document.querySelector('#player-info')

const returnPlayers = ({data:players})=> displayPlayers(players)


const getPlayers = ()=> axios.get(`http://localhost:4545/api/character/`).then(returnPlayers)
const addPlayer = body => axios.post(`http://localhost:4545/api/character/`,body).then(returnPlayers)
const deletePlayer = id => axios.delete(`http://localhost:4545/api/character/${id}`).then(returnPlayers)
const updateHp = (id, type) => axios.put(`http://localhost:4545/api/character/${id}`,{type}).then(returnPlayers)

function submitPlayer(e){
    e.preventDefault()

    let name = document.querySelector('#character-name')
    let health = document.querySelector('#character-hp')

    if (name.value === '' && health.value <= 0){
        alert("Need to input name and positive health")
    }else if (name.value === '' || health.value <= 0){
        alert("You are missing some info or have negetive health")
    }else {

        
        let playerObj = {
            name: name.value,
            health: health.value
        }
        
        addPlayer(playerObj)
        name.value = ''
        health.value = ''
        
    }
}
    
function displayPlayers(arr){
    playerPreview.innerHTML = ''
    for(let i = 0; i < arr.length; i++){
        showPlayers(arr[i])
    }
}

function showPlayers(players){
    const playerCard = document.createElement('div')

    playerCard.innerHTML = `<section class = "box"><p class ="character-name">${players.name}</p>
    <p>Health: ${players.health}</p>
    <section class = "card-buttons">
    <button onclick = 'updateHp(${players.id}, "minus")'>-</button>
    <button onclick='deletePlayer(${players.id})'>Delete</button>
    <button onclick = 'updateHp(${players.id}, "plus")'>+</button>
    </section>
    </section>`

    playerPreview.appendChild(playerCard)
}

playerform.addEventListener('submit', submitPlayer)

const monsterPreview = document.querySelector('#monster-preview')
const monsterForm = document.querySelector('#monster-info')

const returnMonsters = ({data:monsters})=> showMonsters(monsters)

const goMonsters = ()=> axios.get(`http://localhost:4545/api/monsters/`).then(returnMonsters)
const moreMonsters = body => axios.post(`http://localhost:4545/api/monsters/`, body).then(returnMonsters)
const removeMonster = id => axios.delete(`http://localhost:4545/api/monsters/${id}`).then(returnMonsters)
const healthChange = (id, type) => axios.put(`http://localhost:4545/api/monsters/${id}`, {type}).then(returnMonsters)

function createMonster(e){
    e.preventDefault()

    let mName = document.querySelector('#monster-name')
    let mHp = document.querySelector('#monster-hp')

    if(mName.value === '' && mHp.value <= 0){
        alert("Need to input name and positive number")
    }else if(mName.value === '' || mHp.value <= 0){
        alert("Need to input a name or positive number.")
    }else {

        
        let monsterObj = {
            name: mName.value,
            health: mHp.value
        }
        
        moreMonsters(monsterObj)
        
        mName.value = ''
        mHp.value = ''
    }

}

function showMonsters(arr){
    monsterPreview.innerHTML=''
    for(let i = 0; i < arr.length; i++){
        monsterPlates(arr[i])
    }
}

function monsterPlates(monsters){
    const monsterCard = document.createElement('div')

    monsterCard.innerHTML = `<section class = 'box'><p class = "character-name">${monsters.name}</p>
    <p>Health: ${monsters.health}</p>
    <section class = "card-buttons">
    <button onclick = "healthChange(${monsters.id}, 'minus')">-</button>
    <button onclick = "removeMonster(${monsters.id})">Delete</button>
    <button onclick = "healthChange(${monsters.id}, 'plus')">+</button>
    </section>
    </section>
    `
    monsterPreview.appendChild(monsterCard)
}

monsterForm.addEventListener('submit', createMonster)

const swordBox = document.querySelector('#sword-info')
const swordInput = document.querySelector('#sword-input')
const swordBtn = document.querySelector('#sword-button')

function swordDetails (req, res){
    while (swordBox.firstChild){
        swordBox.removeChild(swordBox.firstChild)
    }

    if (swordInput.value != 0){
        axios.get(`https://www.dnd5eapi.co/api/equipment/${swordInput.value}`).then(function(res){
            const name = res.data.name
            const cat = res.data.weapon_category
            const dice = res.data.damage.damage_dice
            const type = res.data.damage.damage_type.name
            const weaponName = document.createElement('h3')
            const weaponCat = document.createElement('p')
            const weaponDice = document.createElement('p')
            const weaponType = document.createElement('p')

            const meleeBox = document.createElement('div')

            weaponName.textContent = name
            weaponCat.textContent = ("Category: " + cat)
            weaponDice.textContent = ("Dice: " + dice)
            weaponType.textContent = ("Damage type: " + type)

            meleeBox.appendChild(weaponName)
            meleeBox.appendChild(weaponCat)
            meleeBox.appendChild(weaponDice)
            meleeBox.appendChild(weaponType)

            meleeBox.className += "box"

            swordBox.appendChild(meleeBox)

            swordInput.value = 0
        })
    } else {
        const error = document.createElement('h1')
        error.textContent=('Need to input a selection')
        swordBox.appendChild(error)
    }
}

swordBtn.addEventListener('click', swordDetails)

const rangedBox = document.querySelector('#bow-box')
const rangedInput = document.querySelector('#bows-input')
const rangedBtn = document.querySelector('#bow-button')

function bowDetails(req, res){
    while (rangedBox.firstChild){
        rangedBox.removeChild(rangedBox.firstChild)
    }

    if(rangedInput.value != 0){
        axios.get(`https://www.dnd5eapi.co/api/equipment/${rangedInput.value}`).then(function(res){
            const name = res.data.name
            const cat = res.data.weapon_category
            const dice = res.data.damage.damage_dice
            const type = res.data.damage.damage_type.name
            const rangedName = document.createElement('h3')
            const rangedCat = document.createElement('p')
            const rangedDice = document.createElement('p')
            const rangedType = document.createElement('p')

            rangedName.textContent = name
            rangedCat.textContent = ("Category: " + cat)
            rangedDice.textContent= ("Dice: " + dice)
            rangedType.textContent= ("Damage type: " + type)

            rangedBox.appendChild(rangedName)
            rangedBox.appendChild(rangedCat)
            rangedBox.appendChild(rangedDice)
            rangedBox.appendChild(rangedType)

            rangedInput.value = 0
        })
    } else {
        const rangedError = document.createElement('h1')
        rangedError.textContent=('Need to input a selection')
        rangedBox.appendChild(rangedError)
    }
}

rangedBtn.addEventListener('click', bowDetails)

goMonsters()
getPlayers()