const pupsUrl = "http://localhost:3000/pups/"
const divDogBar = document.getElementById('dog-bar')
const divDogInfo = document.getElementById('dog-info')
function fetchPups() {
    fetch(pupsUrl)
    .then(r => r.json())
    .then(pups => pups.forEach(pup => addPup(pup)))
}

fetchPups()

function addPup(pup) {
    // console.log(pup)
    const spanPup = document.createElement('span')
    spanPup.textContent = pup.name
    spanPup.onclick = () => displayPup(pup)
    divDogBar.appendChild(spanPup)
}

function displayPup(pup) {
    // console.log(pup)
    clearDiv(divDogInfo)
    const imgPup = document.createElement('img')
    imgPup.src = pup.image
    divDogInfo.appendChild(imgPup)

    const h2PupName = document.createElement('h2')
    h2PupName.textContent = pup.name
    divDogInfo.appendChild(h2PupName)
    
    const btnPup = document.createElement('button')
    if (pup.isGoodDog) {
        btnPup.textContent = "Good Dog!"
    } else {
        btnPup.textContent = "Bad Dog!"
    } 
    btnPup.onclick = () => {
        patchPup(pup, btnPup)
    }
    divDogInfo.appendChild(btnPup)

}

function clearDiv(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}

function patchPup(pup, btnPup) {
    // console.log('clicked')
    const pupUrl = pupsUrl + pup.id
    const currentPupStatus = pup.isGoodDog

    const updatedPup = {...pup, isGoodDog: !currentPupStatus}

    const patchRequest = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updatedPup)
    }

    fetch(pupUrl, patchRequest)
    .then(r => r.json())
    .then(newPup => displayPup(newPup))

}

