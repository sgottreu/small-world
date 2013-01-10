$ ->
    ###
    
         Global Variables
    
    ###

    window.gameRounds = 10
    window.currentRound = 1
    window.currentPlayer = 1
    window.canPickRace = true
    window.currentTerritory = false
    
    ###
    
         General Functions
    
    ###
    
    aiTurn = () ->
        if window.currentRound > window.gameRounds
            return false
        else
            j = window.currentPlayer-1
        
            if window.window.players[j].canPickRace
                race = Math.floor((Math.random() * 6) + 1)
                
                while window.racePowerStack[race] == null
                    race = Math.floor((Math.random() * 6) + 1)
                pickRacePower(race)
                
            r = window.players[j].civilizations.length-1
            attack = window.players[j].canAttack
            while window.players[j].canAttack == true
            
                pick = Math.floor((Math.random() * (window.territories.length-1)) + 1)         
                attack = territoryAttack(j,r,pick)
                if attack == false then break
    
            return
        
    
    updatePlayerTokens = (j,r,needed) ->
        other = window.currentTerritory
    
    
        window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens - needed
        $("#playerTable tbody").find('[data-id="'+j+'"]').find('[data-td="tokens"]').html(window.players[j].civilizations[r].totalTokens)
        
        window.players[j].civilizations[r].startRound = false
        
        
        
        if(other.playerId != false)
            if !window.players[other.playerId].civilizations[other.playerCivilization].race.inDecline
                console.log(window.players[other.playerId].name+' currently has '+window.players[other.playerId].civilizations[other.playerCivilization].totalTokens+' tokens')
                if window.players[other.playerId].civilizations[other.playerCivilization].race.name == 'Elves'
                    console.log('Returning '+other.playerTokens+' tokens to '+window.players[other.playerId].name)
                    window.players[other.playerId].civilizations[other.playerCivilization].totalTokens += other.playerTokens
                else
                    console.log('Returning '+other.playerTokens+' tokens to '+window.players[other.playerId].name+ ' - 1')
                    window.players[other.playerId].civilizations[other.playerCivilization].totalTokens += (other.playerTokens - 1)
                console.log(window.players[other.playerId].name+' now has '+window.players[other.playerId].civilizations[other.playerCivilization].totalTokens+' tokens')
            

        
    claimTerritory = (j,index) ->
        coords = $('#territory-'+window.territories[index].id).attr("coords").split(",");
        window.colorTerritory(window.players[j].color, coords)
        
        canvas=window.document.getElementById("map")
        ctx = canvas.getContext('2d')
        
        ctx.font = "bold 20px sans-serif"
        ctx.fillStyle = '#fff'
        ctx.globalAlpha = 1.0
        ctx.fillText(window.territories[index].playerTokens, coords[0], coords[1])
        
        debugTerritories(index,false)
        return        

        
    setTerritoryForPlayer = (j,r,index,tokens) ->
        window.territories[index].playerTokens = tokens
        window.territories[index].playerId = j
        window.territories[index].playerCivilization = r
        ###
        window.territories[index].nonEmpty[j] = true
        ###
        window.players[j].territory.push(window.territories[index])
  
        
    attackTerritory = (j,r,index) ->
        window.currentTerritory = window.clone(window.territories[index])
    
        if window.players[j].civilizations[r].totalTokens == 0
            next = changePlayer(j,r)
            checkAI(next)
            return false
            
        if window.territories[index].playerId == j && window.territories[index].playerCivilization == r
            console.log('----You cannot attack territory of the same race')
            return true
        
        console.log(window.players[j].name+' Current Tokens: ', window.players[j].civilizations[r].totalTokens)
        
        needed = getAttackStrength(window.territories[index],j,r)

        console.log('Number of Tokens needed to attack', needed)
        
        console.log(window.players[j].name+' is attacking territory: '+window.territories[index].id)
        console.log('  Type is: '+window.territories[index].type)
        
        if needed <= window.players[j].civilizations[r].totalTokens
            setTerritoryForPlayer(j,r,index,needed)
            claimTerritory(j,index)
            updatePlayerTokens(j,r,needed)
            
            console.log(window.players[j].name+' now has Tokens: ', window.players[j].civilizations[r].totalTokens)
            return true
        else
            if window.players[j].civilizations[r].totalTokens == 0
                next = changePlayer(j,r)
                checkAI(next)
                return false
            else
                console.log(window.players[j].name+' is rolling the die')
                dieRoll = window.rollDie()
                console.log(window.players[j].name+' rolled a '+dieRoll)
                
                if needed <= window.players[j].civilizations[r].totalTokens + dieRoll
                    setTerritoryForPlayer(j,r,index,window.players[j].civilizations[r].totalTokens)
                    console.log('Roll was successful.')
                    claimTerritory(j,index)
                    updatePlayerTokens(j,r,window.players[j].civilizations[r].totalTokens)
                    next = changePlayer(j,r)
                    checkAI(next)              
                    return true
                else
                    console.log(window.players[j].name+' failed the roll.')
                    next = changePlayer(j,r)
                    checkAI(next)
                    return false

    getAttackStrength = (territory,j,r) ->
        points = territory.tokensNeeded()
        points += window.players[j].civilizations[r].race.attackStrength(territory, j)
        points += window.players[j].civilizations[r].power.attackStrength(territory, j)
        points

    checkAI = (j) ->
        if (window.players[j].playerType == 'ai')
            aiTurn()
            return true
        return false

    declareWinner = () ->
        console.log('The game is over')
        winnerTotal = 0
        winnerName = ''
        for item, i in window.players
            if item.victoryPoints > 0
                winnerTotal = item.victoryPoints
                winnerName = item.name
        
        console.log(winnerName+' won with '+winnerTotal+' Victory Points')
    
    
    changePlayer = (j,r) ->
        window.players[j].canAttack = false   
        window.players[j].civilizations[r].startRound = false
        calculateVictoryPoints(j,r)
             
        console.log(window.players[j].name+' has completed their turn.')

        window.currentPlayer++         
        if(window.currentPlayer > window.players.length)
            console.log('*********')
            console.log('********* Concluding Round '+window.currentRound)
            console.log('*********')
            window.currentRound++
            
            if window.currentRound > window.gameRounds
                declareWinner()
            else
                console.log('*********')
                console.log('********* Starting Round '+window.currentRound)
                console.log('*********')
                window.currentPlayer = 1
                j = window.currentPlayer-1
                console.log('Current player is '+window.players[j].name+'.')
                prepForTurn(j,r)
        else     
      
            j = window.currentPlayer-1            
            console.log('Current player is '+window.players[j].name+'.')
            prepForTurn(j,r)
        return j

    
    calculateVictoryPoints = (j,r) ->
        nonEmpty = 0
        console.log('*********')
        console.log('********* Calculating Score')
        console.log('*********')
        for item, i in window.territories
            if item.playerId == j
                window.players[j].victoryPoints++
                console.log('+1 for holding Territory '+item.id)
                window.players[j].victoryPoints += window.players[j].civilizations[r].power.checkVictoryPoints(item,j)
                window.players[j].victoryPoints += window.players[j].civilizations[r].race.checkVictoryPoints(item,j)

        $("#playerTable tbody").find('[data-id="'+j+'"]').find('td:eq(1)').html(window.players[j].victoryPoints)
        
        console.log('*********')
        console.log('********* Begin Next Player')
        console.log('*********')
        
    prepForTurn = (j,r) ->
        gatherTokens(j,r)
        window.players[j].canAttack = true
    
    gatherTokens = (j,r) ->
        if !window.window.players[j].canPickRace
            for item, i in window.territories
                if item.playerId == j
                    tokens = parseInt(item.playerTokens) - 1
                    window.territories[i].playerTokens = 1
                    window.players[j].civilizations[r].totalTokens = window.players[j].civilizations[r].totalTokens + tokens
                    console.log('Pulling '+tokens+' tokens from territory '+item.id)
                    debugTerritories(i,false)
            console.log(window.players[j].name+' has '+window.players[j].civilizations[r].totalTokens+' tokens')
    

    showRacePowerStack = (stack,num) ->
        if stack.race  
            race = stack.race.name 
        else 
            race=''
        
        $('#card-stack').find('tbody:last').append('<tr data-id="'+num+'"><td></td><td>'+race + ' - ' + stack.power.name+'</td><td>'+stack.totalTokens+'</td></tr>')
        if num >=6 
            $("#card-stack tbody").find('[data-id="'+num+'"]').hide()
        return 

    
    
    setPlayerTable = (item, i) ->
        $("#playerTable").find('tbody:last').append('<tr data-id="'+i+'"><td>'+item.name+'</td><td>'+item.victoryPoints+'</td><td data-td="race_power"></td><td data-td="tokens"></td></tr>')
        return
    

    pickRacePower = (row) =>
        
        j = window.currentPlayer-1
        
        if window.players[j].playerType == 'ai'
            row = $("#card-stack tbody").find('[data-id="'+row+'"]')

        id = $(row).data("id")
        
        if $("#card-stack tbody").find('[data-id="'+id+'"]').index() > window.players[j].victoryPoints
            alert('You don\'t have enough Victory Points to choose that race.')
        
        for item, i in window.racePowerStack when i < id
            
            if window.racePowerStack[i] == null 
                continue
            
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
        
        console.log(window.players[j].name + ' has chosen as their race: '+ window.racePowerStack[id].race.name)
        console.log(window.players[j].name + ' has chosen as their power: '+ window.racePowerStack[id].power.name)
        
        $("#card-stack tbody tr:eq(5)").next().show()

        $(row).remove()
        window.racePowerStack[id] = null
        window.window.players[j].canPickRace = false
        
        
    territoryAttack = (j,r,index) =>
        if window.players[j].civilizations[r].startRound
            
            if window.territories[index].edgeBorder && !window.territories[index].isWater
                window.players[j].canAttack = attackTerritory(j,r,index)
            else
                if window.territories[index].edgeBorder && window.territories[index].isWater && window.players[j].civilizations[r].power.name == 'Seafaring' 
                    window.players[j].canAttack = attackTerritory(j,r,index)
                else if window.players[j].civilizations[r].power.name == 'Flying'
                    window.players[j].canAttack = attackTerritory(j,r,index)
                else
                    console.log('----You must chose a territory on the edge.')
                return true
            

        else
            if window.territories[index].isAdjacent(window.players[j].territory) && !window.territories[index].isWater
                window.players[j].canAttack = attackTerritory(j,r,index)
            else if window.territories[index].edgeBorder && window.territories[index].isWater && window.players[j].civilizations[r].power.name == 'Seafaring' 
                window.players[j].canAttack = attackTerritory(j,r,index)
            else if window.players[j].civilizations[r].power.name == 'Flying'
                window.players[j].canAttack = attackTerritory(j,r,index)
            else
                console.log('----That territory is not adjacent.') 
                return true
        

    debugTerritories = (index,start) ->
        html = '<td>' + window.territories[index].id + '</td>'
        html += '<td>'+window.territories[index].playerId+'</td>'
        html += '<td>'+window.territories[index].totalTokens+'</td>'
        html += '<td>'+window.territories[index].playerTokens+'</td>'
        html += '<td>'+window.territories[index].type+'</td>'
        
        
        if start == true
            for item, i in window.players 
                if window.territories[index].lostTribe
                    window.territories[index].nonEmpty[i] = true
                else 
                    window.territories[index].nonEmpty[i] = false
            $('#territoryTable').find('tbody:last').append('<tr data-id="'+index+'">'+html+'</tr>')
        else
            $("#territoryTable tbody").find('[data-id="'+index+'"]').html(html)
        return
        
    ###
    
         Loops to Build things
    
    ###

    (setPlayerTable(window.players[i], i)) for item, i in window.players 
    
    (showRacePowerStack(item,i) for item, i in window.racePowerStack)

    (debugTerritories(i,true) for item, i in window.territories)

    
    ###
         
         jQuery UI functions
         
    ###


    $(".territory").bind 'hover', ->
        id = this.id.split("-")
        index = parseInt(id[1] - 1)

    $(".territory").bind 'dblclick', ->
        id = this.id.split("-")
        index = parseInt(id[1] - 1)
        j = window.currentPlayer-1
        r = window.players[j].civilizations.length - 1
        
        territoryAttack(j,r,index)
        
    $("#card-stack tbody tr").bind 'click', ->
        if window.window.players[window.currentPlayer-1].canPickRace
            pickRacePower(this)
        else 
            alert('You have already picked a race this round.')
        return

    return
        
