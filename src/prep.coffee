$ ->
    updatePlayerTokens = (j,r,needed) ->
        window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens - needed
        $("#playerTable tbody").find('[data-id="'+j+'"]').find('[data-td="tokens"]').html(window.players[j].civilizations[r].totalTokens)
        return 
        
    attackTerritory = (j,r,index) ->
        if window.players[j].civilizations[r].totalTokens == 0
            changePlayer()
            return false
            
        needed = window.territories[index].tokensNeeded()
        console.log('Number of Tokens needed', needed)
        if needed <= window.players[j].civilizations[r].totalTokens
            window.players[j].territory.push(window.territories[index])
            updatePlayerTokens(j,r,needed)
            window.players[j].civilizations[r].startRound = false
            if window.players[j].civilizations[r].totalTokens == 0
                changePlayer
        else
            if window.players[j].civilizations[r].totalTokens == 0
                changePlayer()
            else
                alert('You do not have enough tokens to attack')
    
    changePlayer = () ->
        
        window.currentPlayer++
        if(window.currentPlayer > window.players.length)
            window.currentRound++
            window.currentPlayer = 1
        else
            console.log('Current player is '+window.players[window.currentPlayer-1].name+'.')
    

    $('.map').maphilight => {fade: false}
    $(".territory").bind 'hover', ->
        id = this.id.split("-")
        index = parseInt(id[1] - 1)
        
    $(".territory").bind 'click', ->
        id = this.id.split("-")
        index = parseInt(id[1] - 1)
        
        data = $('#'+this.id).data('maphilight') || {}
        data.fillColor = "cccccc"
        $('#'+this.id).data('maphilight', data)

    $(".territory").bind 'dblclick', ->
        id = this.id.split("-")
        index = parseInt(id[1] - 1)
        j = window.currentPlayer-1
        r = window.players[j].civilizations.length - 1

        if window.players[j].civilizations[r].startRound
            
            if window.territories[index].edgeBorder
                attackTerritory(j,r,index)
            else
                alert('You must chose a territory on the edge.')
            
            return true
        else
            if window.territories[index].isAdjacent(window.players[j].territory)
                attackTerritory(j,r,index)
            else
                alert('That territory is not adjacent.')
        


    showRacePowerStack = (stack,num) ->
        if stack.race  
            race = stack.race.name 
        else 
            race=''
        
        $('#card-stack').find('tbody:last').append('<tr data-id="'+num+'"><td></td><td>'+race + ' - ' + stack.power.name+'</td><td>'+stack.totalTokens+'</td></tr>')
        if num >=6 
            $("#card-stack tbody").find('[data-id="'+num+'"]').hide()
        return 

    (showRacePowerStack(item,i) for item, i in window.racePowerStack)
    
    setPlayerTable = (item, i) ->
        $("#playerTable").find('tbody:last').append('<tr data-id="'+i+'"><td>'+item.name+'</td><td>'+item.victoryPoints+'</td><td data-td="race_power"></td><td data-td="tokens"></td></tr>')
        return
    
    window.gameRound = 10
    
    window.currentRound = 1
    window.currentPlayer = 1
    window.canPickRace = true
    
    (setPlayerTable(window.players[i], i)) for item, i in window.players 

    pickRacePower = (row) =>
        id = $(row).data("id")
        j = window.currentPlayer-1
        
        if $("#card-stack tbody").find('[data-id="'+id+'"]').index() > window.players[j].victoryPoints
            alert('You don\'t have enough Victory Points to choose that race.')
        
        for item, i in window.racePowerStack when i < id
            if $("#card-stack tbody").find('[data-id="'+i+'"]').index() >= 0 && id != i
                window.racePowerStack[i].points++
                window.players[j].victoryPoints--
                
            $("#card-stack tbody").find('[data-id="'+i+'"]').find('td:first').html(window.racePowerStack[i].points)
            $("#playerTable tbody").find('[data-id="'+j+'"]').find('td:eq(1)').html(window.players[j].victoryPoints)
    
        window.players[j].victoryPoints += window.racePowerStack[id].points
        window.racePowerStack[id].points = 0
        window.players[j].civilizations.push(window.racePowerStack[id])
        
        $("#playerTable tbody").find('[data-id="'+j+'"]').find('[data-td="race_power"]').html(window.racePowerStack[id].race.name + ' - ' + window.racePowerStack[id].power.name)
        $("#playerTable tbody").find('[data-id="'+j+'"]').find('td:last').html(window.racePowerStack[id].totalTokens)
        
        $("#card-stack tbody tr:eq(5)").next().show()

        $(row).remove()
        window.racePowerStack[id].delete
        window.canPickRace = false
        
    $("#card-stack tbody tr").bind 'click', ->
        if window.canPickRace
            pickRacePower(this)
        else 
            alert('You have already picked a race this round.')
        
        
