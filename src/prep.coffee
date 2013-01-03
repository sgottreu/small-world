$ ->
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
        ###
        for key, value of territories[index].adjacent
            
            data = $('#territory-'+value).data('maphilight') || {}
            data.fillColor = "ff0000"
            $('#territory-'+value).data('maphilight', data)
            
            $('#territory-'+value).mouseover()
        ###
    $(".territory").bind 'dblclick', ->
        id = this.id.split("-")
        index = parseInt(id[1] - 1)
        ###
        for key, value of territories[index].adjacent
            data = $('#territory-'+value).data('maphilight') || {}
            data.fillColor = "cccccc"
            $('#territory-'+value).data('maphilight', data)
        ###            
        if window.currentRound == 1
            return true


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
        $("#playerTable").find('tbody:last').append('<tr data-id="'+i+'"><td>'+item.name+'</td><td>'+item.victoryPoints+'</td><td data-td="race_power"></td><td></td></tr>')
        return
    
    gameRound = 10
    
    window.currentRound = 1
    window.currentPlayer = 1
    window.canPickRace = true
    
    (setPlayerTable(window.players[i], i)) for item, i in window.players 

    pickRacePower = (row) =>
        id = $(row).data("id")
        j = currentPlayer-1
        console.log($("#card-stack tbody").find('[data-id="'+id+'"]').index())
        
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
        
        
