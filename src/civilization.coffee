class Civilization
###
    constructor: (@data) ->
        @name=false
        @coins=0
        @territory=[]
        @perRound=false
        @perGame=false
    
        for key, value of @data
            this[key] = value
        @data = null

    set: (data) ->
        for key, value of @data
            this[key] = value
        @data = null
        
    attackStrength: (territory, points) ->
###

chooseCivilization = (civIndex) ->