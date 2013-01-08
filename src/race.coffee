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
    checkVictoryPoints: (territory) ->
        return 0

class Amazons extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Dwarves extends Race 
    checkVictoryPoints: (territory) ->  
        if territory.isMine
            return 1
        else 
            return 0
class Elves extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Ghouls extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Ratmen extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Skeletons extends Race 
    checkVictoryPoints: (territory) ->  
        return 0  
class Sorcerers extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Tritons extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Giants extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Halflings extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Humans extends Race 
    checkVictoryPoints: (territory) ->  
        if territory.type == 'farm'
            return 1
        else
            return 0
class Orcs extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Trolls extends Race 
    checkVictoryPoints: (territory) ->  
        return 0
class Wizards extends Race 
    checkVictoryPoints: (territory) ->  
        if territory.isMagic
            return 1
        else return 0
         
window.races = [
    new Race {name:'Amazons', totalAvailTokens:15, startingTokens:6}
    new Race {name:'Dwarves', totalAvailTokens:8, startingTokens:3}
    new Race {name:'Elves', totalAvailTokens:11, startingTokens:6}
    new Race {name:'Ghouls', totalAvailTokens:10, startingTokens:5}
    new Race {name:'Ratmen', totalAvailTokens:13, startingTokens:8}
    new Race {name:'Skeletons', totalAvailTokens:20, startingTokens:6}
    new Race {name:'Sorcerers', totalAvailTokens:18, startingTokens:5}
    new Race {name:'Tritons', totalAvailTokens:11, startingTokens:6}
    new Race {name:'Giants', totalAvailTokens:11, startingTokens:6}
    new Race {name:'Halflings', totalAvailTokens:11, startingTokens:6}
    new Race {name:'Humans', totalAvailTokens:10, startingTokens:5}
    new Race {name:'Orcs', totalAvailTokens:10, startingTokens:5}
    new Race {name:'Trolls', totalAvailTokens:10, startingTokens:5}
    new Race {name:'Wizards', totalAvailTokens:10, startingTokens:5}
]
    
window.raceStack = window.fisherYates window.races


