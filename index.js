const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const addDataForm = document.getElementById('add-data-form')
const xInput = document.getElementById('x-input')
const yInput = document.getElementById('y-input')
const dataList = document.getElementById('data-list')
const dataPointTemplate = document.getElementById('data-point-template')
const x = []
const Y = []

function bestSlope() {
    let sumProducts = 0
    let sumSquaredX = 0

    for(let i = 0; i < x.length; i++) {
        sumProducts += x[i] * Y[i]
        sumSquaredX += x[i] ** 2
    }

    if(sumSquaredX == 0)
        return 0

    return sumProducts / sumSquaredX
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'

    for(let i = 0; i < x.length; i++) {
        ctx.beginPath()
        ctx.ellipse(x[i], canvas.height - Y[i], 3, 3, 0, 0, Math.PI * 2)
        ctx.fill()
    }

    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(0, canvas.height)
    ctx.lineTo(canvas.width, Math.floor(canvas.height - canvas.width * bestSlope()))
    ctx.stroke()
}

addDataForm.addEventListener('submit', e => {
    e.preventDefault()
    const i = x.length
    x.push(parseFloat(xInput.value))
    Y.push(parseFloat(yInput.value))
    const el = document.importNode(dataPointTemplate.content.firstElementChild, true)
    el.querySelector('.data-point-x').textContent = xInput.value
    el.querySelector('.data-point-y').textContent = yInput.value
    el.querySelector('.data-point-remove-btn').addEventListener('click', () => {
        x.splice(i, 1)
        Y.splice(i, 1)
        el.parentElement.removeChild(el)
        draw()
    })
    dataList.appendChild(el)
    xInput.value = ''
    yInput.value = ''
    draw()
})