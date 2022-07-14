const pos1 = document.getElementById('pos1');
const pos2 = document.getElementById('pos2');
const pos3 = document.getElementById('pos3');
const pos4 = document.getElementById('pos4');
const pos5 = document.getElementById('pos5');
const pos6 = document.getElementById('pos6');
const pos7 = document.getElementById('pos7');
const pos8 = document.getElementById('pos8');
const pos9 = document.getElementById('pos9');

let matrix = [pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9]

let xPoints = document.getElementById('x-points')
let oPoints = document.getElementById('o-points')


const winMatrix = []
let xTurn = true

document.addEventListener('click', e => {
  e.preventDefault()
  let btnClicked = e.target.closest('.space')
  if (btnClicked) {
    let btnSelected = matrix.find(el => el.id === btnClicked.id)
    if (xTurn) {
      btnSelected.value = "X"
      btnSelected.style.color = "#e76f51"
      winMatrix[matrix.indexOf(btnSelected)] = "X"
      xTurn = false
      btnSelected.disabled = true
    } else {
      btnSelected.value = "O";
      btnSelected.style.color = "#264653"
      winMatrix[matrix.indexOf(btnSelected)] = "O"
      xTurn = true
      btnSelected.disabled = true
    }
    checkMatrix()
  } else {
    null
  }
})

let players
let sessionPlayers= JSON.parse(sessionStorage.getItem('players'))
if (sessionPlayers === null) {
  players= [{
    name: 'X',
    points: 0
  },
  {
    name: 'O',
    points: 0
  }
]
} else {
  players=sessionPlayers
  xPoints.value = players[0].points
  oPoints.value = players[1].points
}
const checkMatrix = () => {
  
  //COL
  (winMatrix[0]+winMatrix[1]+winMatrix[2] == 'XXX'|| winMatrix[0]+winMatrix[1]+winMatrix[2] == 'OOO')? winFun(winMatrix[0]) : null;
  (winMatrix[3]+winMatrix[4]+winMatrix[5] == 'XXX'|| winMatrix[3]+winMatrix[4]+winMatrix[5] == 'OOO')? winFun(winMatrix[3]) : null;
  (winMatrix[6]+winMatrix[7]+winMatrix[8] == 'XXX'|| winMatrix[6]+winMatrix[7]+winMatrix[8] == 'OOO')? winFun(winMatrix[6]) : null;
  //ROW
  (winMatrix[0]+winMatrix[3]+winMatrix[6] == 'XXX'|| winMatrix[0]+winMatrix[3]+winMatrix[6] == 'OOO')? winFun(winMatrix[0]) : null;
  (winMatrix[1]+winMatrix[4]+winMatrix[7] == 'XXX'|| winMatrix[1]+winMatrix[4]+winMatrix[7] == 'OOO')? winFun(winMatrix[1]) : null;
  (winMatrix[2]+winMatrix[5]+winMatrix[8] == 'XXX'|| winMatrix[2]+winMatrix[5]+winMatrix[8] == 'OOO')? winFun(winMatrix[2]) : null;
  //DIAG
  (winMatrix[0]+winMatrix[4]+winMatrix[8] == 'XXX'|| winMatrix[0]+winMatrix[4]+winMatrix[8] == 'OOO')? winFun(winMatrix[0]) : null;
  (winMatrix[2]+winMatrix[4]+winMatrix[6] == 'XXX'|| winMatrix[2]+winMatrix[4]+winMatrix[6] == 'OOO')? winFun(winMatrix[2]) : null;
  

}
const winFun = (player) => {
  let plyIndex = players.findIndex(p => p.name == player)
  players[plyIndex].points++
  writePoints()
  
  swal(`Player ${players[plyIndex].name} win!`,{icon: "success"})

  window.location.reload()
}
const writePoints = () => {
  xPoints.value = players[0].points
  oPoints.value = players[1].points
  sessionStorage.removeItem('players')
  sessionStorage.setItem('players',JSON.stringify(players))
}
const restartGame = ()=>{
  sessionStorage.clear()
  window.location.reload()
}