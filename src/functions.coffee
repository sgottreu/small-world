# Adapted from the javascript implementation at http://sedition.com/perl/javascript-fy.html
 
# Randomizes the order of elements in the passed in array in place.
window.fisherYates = (arr) ->
    i = arr.length;
    if i == 0 then return false
 
    while --i
        j = Math.floor(Math.random() * (i+1))
        tempi = arr[i]
        tempj = arr[j]
        arr[i] = tempj
        arr[j] = tempi
    return arr
    
window.rollDie = () ->
    Die = Math.floor((Math.random() * 6) + 1)
    if Die == 1
        return 0
    
    else if Die == 2 
        return 1
    
    else if Die == 3 
        return 0
    
    else if Die == 4 
        return 2
    
    else if Die == 5 
        return 0
    
    else if Die == 6 
        return 3
    

window.colorTerritory = (color, poly) ->

    canvas=window.document.getElementById("map")
    ctx = canvas.getContext('2d')
    ctx.fillStyle = color
    ctx.globalAlpha = 1
    
    ctx.beginPath()
    ctx.moveTo(poly[0], poly[1])
    
    (ctx.lineTo( poly[num] , poly[num+1] )) for num in [2..poly.length-1] by 2

    ctx.closePath()
    ctx.fill()
    return true    
    
