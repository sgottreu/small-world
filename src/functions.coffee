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
    

