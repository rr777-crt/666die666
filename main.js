'use strict'
const scoreText = document.getElementById("score")
const addText = document.getElementById("add")
const button = document.getElementById("button")



const btnAdd2 = document.getElementById("add-2")
const btnAdd5 = document.getElementById("add-5")



let isLoadingReady = false
console.log('v', '001')

const musicList = [
  'Grasswalk.mp3',
 
]
const MUSIC = {}
let loadCount = 0
musicList.forEach((m, i) => {
   const music = new Audio()
   music.src = m
   MUSIC[m] = music
   music.oncanplaythrough = (e) => {
    e.target.oncanplaythrough = null
    loadCount++
    if (loadCount === musicList.length) isLoadingReady = true
     console.log('isLoadingReady', isLoadingReady)
   }
})


let score = 0
let add = 1

button.onclick = getClick

btnAdd2.onclick = () => getClickAdd(6, 100)
btnAdd5.onclick = () => getClickAdd(6666, 100)


 
function getClick(n) {
    if ( Number.isInteger(n) ) score += n
    else score += add
    scoreText.innerText = score

    checkBGImage()
    if (isLoadingReady && score>= 66) {
     isLoadingReady = false
     MUSIC['Grasswalk.mp3'].play()
    }
}

function getClickAdd(n, price) {
    if (score < price) return

    score -= price
    scoreText.innerText = score
    
    add = n
    addText.innerText = add
}

function checkBGImage() {

    if (score > 666) {
        button.style.backgroundImage = 'url(https://klev.club/uploads/posts/2023-11/1698878136_klev-club-p-arti-gorokhostrel-zombi-43.jpg)'
    }
    
    
function mining(scorePerSec , price) {
    if (score > price) {
        score -= price
        scoreText.innerText = score
        setInterval( getClick, 1000, scorePerSec)
    }
}
      
   

    
