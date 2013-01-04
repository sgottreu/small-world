class Player
    constructor: (@data) ->
        @name=false
        @victoryPoints=5
        @territory= new Array()
        @civilizations = new Array()
        @totalTerritories=0
        @playerType=''
        @hasPlayed= new Array()
        @canAttack = false
        @canPickRace = true
    
        for key, value of @data
            this[key] = value
        @data = null

    set: (data) ->
        for key, value of @data
            this[key] = value
        @data = null
        
        
window.players = [
    new Player { name: 'Me', playerType: 'person'}
    new Player { name: 'HAL 2000', playerType: 'ai'}
]
