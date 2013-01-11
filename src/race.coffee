class Race
    constructor: (@data) ->
        @name=false
        @totalAvailTokens=0
        @startingTokens=0
        @inDecline=false
        @power=false
        @currentTokens=0
        @firstPlay=true
    
        for key, value of @data
            this[key] = value
        @data = null
    checkVictoryPoints: (points) ->
        console.log('Returning Race Victory points')
        return points

class Amazons extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Dwarves extends Race 
    checkVictoryPoints: (territory, j) ->  
        if territory.isMine
            super 1
        else 
            super 0
class Elves extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Ghouls extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Ratmen extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Skeletons extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0  
class Sorcerers extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Tritons extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Giants extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Halflings extends Race 
    constructor: (@data) ->
        @holeInTheGrounds=2

    checkVictoryPoints: (territory, j) ->  
        super 0
class Humans extends Race 
    checkVictoryPoints: (territory, j) ->  
        if territory.type == 'farm'
            console.log('+1 for Territory '+territory.id+ ' which is farm')
            super 1
        else
            super 0
class Orcs extends Race 
    checkVictoryPoints: (territory, j) ->
        console.log('Calculating Orc Victory points')
        if territory.nonEmpty[j] == true 
            console.log('+1 for non-Empty Territory '+territory.id)
            super 1
        else 
            super 0
class Trolls extends Race 
    checkVictoryPoints: (territory, j) ->  
        super 0
class Wizards extends Race 
    checkVictoryPoints: (territory, j) ->  
        if territory.isMagic
            super 1
        else 
            super 0
         
window.races = [
    new Amazons {name:'Amazons', totalAvailTokens:15, startingTokens:6}
    new Dwarves {name:'Dwarves', totalAvailTokens:8, startingTokens:3}
    new Elves {name:'Elves', totalAvailTokens:11, startingTokens:6}
    new Ghouls {name:'Ghouls', totalAvailTokens:10, startingTokens:5}
    new Ratmen {name:'Ratmen', totalAvailTokens:13, startingTokens:8}
    new Skeletons {name:'Skeletons', totalAvailTokens:20, startingTokens:6}
    new Sorcerers {name:'Sorcerers', totalAvailTokens:18, startingTokens:5}
    new Tritons {name:'Tritons', totalAvailTokens:11, startingTokens:6}
    new Giants {name:'Giants', totalAvailTokens:11, startingTokens:6}
    new Halflings {name:'Halflings', totalAvailTokens:11, startingTokens:6}
    new Humans {name:'Humans', totalAvailTokens:10, startingTokens:5}
    new Orcs {name:'Orcs', totalAvailTokens:10, startingTokens:5}
    new Trolls {name:'Trolls', totalAvailTokens:10, startingTokens:5}
    new Wizards {name:'Wizards', totalAvailTokens:10, startingTokens:5}
]
    
window.raceStack = window.fisherYates window.races


