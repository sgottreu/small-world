class Power
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
    
  attackStrength: (points) ->
    return points
    
  checkVictoryPoints: (points) ->
    console.log('Returning Power Victory points')
    return points

class Alchemist extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
        super @coins
class Berserk extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Bivouacking extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Commando extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Diplomat extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class DragonMaster extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Flying extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Forest extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
        if territory.type == 'forest'
            super 1
        else 
        super 0
class Fortified extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Heroic extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Hill extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
        if territory.type == 'hill'
            super 1
        else 
        super 0
class Merchant extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
        super 1
class Mounted extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Pillaging extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
        console.log('Calculating Pillaging Victory points')
        if territory.nonEmpty[j] == true 
            console.log('+1 for non-Empty Territory '+territory.id)
            super 1
        else 
        super 0
class Seafaring extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Spirit extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Stout extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
    super 0
class Swamp extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) -> 
        if territory.type == 'swamp'
            super 1
        else 
        super 0
class Underworld extends Power 
  set: ->
  attackStrength: (territory, j) ->
        if(territory.isUnderworld) 
            super -1
        else 
        super 0
        
  checkVictoryPoints: (territory, j) -> 
    super 0
    
class Wealthy extends Power 
  set: ->
  attackStrength: (territory, j) ->
    super 0
  checkVictoryPoints: (territory, j) ->    
        if window.currentRound == 1
            super 7
        else 
        super 0
        
window.powers = [
    new Hill { name: 'Hill', coins: 1, territories: ['hill'], startingTokens: 4}
    new Flying { name: 'Flying', startingTokens: 5}
    new Alchemist { name: 'Alchemist', coins: 2, perRound: true, startingTokens: 4}
    new Berserk { name: 'Berserk', startingTokens: 4}
    new Bivouacking { name: 'Bivouacking', startingTokens: 5}
    new Commando { name: 'Commando', startingTokens: 4}
    new Diplomat { name: 'Diplomat', startingTokens: 5}
    new DragonMaster { name: 'Dragon Master', startingTokens: 5}

    new Forest { name: 'Forest', startingTokens: 4}
    new Fortified { name: 'Fortified', startingTokens: 3}
    new Heroic { name: 'Heroic', startingTokens: 5}

    new Merchant { name: 'Merchant', startingTokens: 2}
    new Mounted { name: 'Mounted', coins: 1, territories: ['hill', 'farm'], startingTokens: 5}
    new Pillaging { name: 'Pillaging', startingTokens: 5}
    new Seafaring { name: 'Seafaring', coins: 1, territories: ['water'], startingTokens: 5}
    new Spirit { name: 'Spirit', startingTokens: 5}
    new Stout { name: 'Stout', startingTokens: 4}
    new Swamp { name: 'Swamp', coins: 1, territories: ['swamp'], startingTokens: 4}
    new Underworld { name: 'Underworld', startingTokens: 5}
    new Wealthy { name: 'Wealthy', startingTokens: 4}
]

if window.debug
    window.powerStack = window.powers
else
    window.powerStack = window.fisherYates window.powers

window.racePowerStack = []

setStartingStrength = (row) =>
    window.racePowerStack[i].totalTokens = window.racePowerStack[i].race.startingTokens + window.racePowerStack[i].power.startingTokens
    window.racePowerStack[i].startRound = true

(window.racePowerStack.push({power: num}) for num in window.powerStack)
(window.racePowerStack[i].race = num for num, i in window.raceStack)
(window.racePowerStack[i].points = 0 for num, i in window.raceStack)

(setStartingStrength(i) for num, i in window.raceStack)
   
