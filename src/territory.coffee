class Territory

    constructor: (@data) ->
        @id=0
        @adjacent = new Array()
        @mountain=false
        @waterBorder=false
        @mountainBorder=false
        @isWater = false
        @isMine = false
        @isMagic = false
        @isUnderworld = false
        @edgeBorder=false
        @type=''
        @lostTribe=false
        @lair=false
        @fort=false
        @biovauk=false
        @numBiovauk=0
        @herioc=false
        @dragon=false
        @holeInTheGround=false
        
        @totalTokens = 0
        @playerTokens = 0
        @playerId = false
        @playerTerritory = false
    
        for key, value of @data
            this[key] = value
        @data = null
    
    set: ->
    
    tokensNeeded: ->
        needed = 2
        
        needed = needed + this.playerTokens
        
        if(this.mountain) 
            needed++
        if(this.lostTribe)
            needed++
        if(this.lair)
            needed++
        if(this.fort)
            needed++
            
        needed = needed + this.numBiovauk
        
        needed
        
    isAdjacent: (territory)->
        
        for item, i in this.adjacent
            for terr, t in territory
                if item == terr.id
                    return true
        return false

        
        

window.territories = [
    new Territory { id: 1, type:'water', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:true, isWater:true, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [2,6]}
    new Territory { id:2, type: 'farm', waterBorder: true, mountainBorder:true, edgeBorder:true, isMagic: true, adjacent: [1,3,6,7] }
    new Territory {id:3, type:'forest', isMine:true, waterBorder: true, mountainBorder:true, edgeBorder:true, adjacent: [2,4,7,8,9] }
    new Territory {id:4, type:'swamp', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:true, lostTribe:true, adjacent: [3,5,9,10]}
    new Territory {id:5, type:'hill', mountain:false, waterBorder:false, mountainBorder:false, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [4,10,11]}
    new Territory {id:6, type:'moutain', mountain:true, waterBorder:true, mountainBorder:false, edgeBorder:true, isWater:false, isMine:true, isMagic:false, isUnderworld:true, lostTribe:false, adjacent: [1,2,7,12]}
    new Territory {id:7, type:'hill', mountain:false, waterBorder:true, mountainBorder:true, edgeBorder:false, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:true, adjacent: [2,3,6,8,12,13]}
    new Territory {id:8, type:'water', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:false, isWater:true, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [3,7,9,13,14]}
    new Territory {id:9, type:'mountain', mountain:true, waterBorder:true, mountainBorder:false, edgeBorder:false, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [3,4,8,10,14,15]}
    new Territory {id:10, type:'farm', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:false, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [4,5,9,11,15]}
    new Territory {id:11, type:'forest', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:true, isWater:false, isMine:false, isMagic:true, isUnderworld:false, lostTribe:true, adjacent: [5,10,15,16]}
    new Territory {id:12, type:'farm', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:true, adjacent: [6,7,13,17,18]}
    new Territory {id:13, type:'forest', mountain:false, waterBorder:true, mountainBorder:false, edgeBorder:false, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:true, adjacent: [7,8,12,14,18,19]}
    new Territory {id:14, type:'farm', mountain:false, waterBorder:true, mountainBorder:true, edgeBorder:false, isWater:false, isMine:false, isMagic:true, isUnderworld:false, lostTribe:true, adjacent: [8,9,13,15,19,20,21]}
    new Territory {id:15, type:'hill', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:false, isWater:false, isMine:false, isMagic:false, isUnderworld:true, lostTribe:true, adjacent: [9,10,11,14,16,21,22]}
    new Territory {id:16, type:'mountain', mountain:true, waterBorder:true, mountainBorder:false, edgeBorder:true, isWater:false, isMine:true, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [11,15,22,23]}
    new Territory {id:17, type:'swamp', mountain:false, waterBorder:false, mountainBorder:false, edgeBorder:true, isWater:false, isMine:false, isMagic:true, isUnderworld:false, lostTribe:true, adjacent: [12,18]}
    new Territory {id:18, type:'hill', mountain:false, waterBorder:false, mountainBorder:false, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:true, lostTribe:false, adjacent: [12,13,17,19]}
    new Territory {id:19, type:'swamp', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:true, isWater:false, isMine:true, isMagic:false, isUnderworld:false, lostTribe:true, adjacent: [13,14,18,20]}
    new Territory {id:20, type:'mountain', mountain:true, waterBorder:false, mountainBorder:false, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [14,19,21]}
    new Territory {id:21, type:'swamp', mountain:false, waterBorder:true, mountainBorder:true, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [14,15,20,22,23]}
    new Territory {id:22, type:'forest', mountain:false, waterBorder:true, mountainBorder:true, edgeBorder:true, isWater:false, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [15,16,21,23]}
    new Territory {id:23, type:'water', mountain:false, waterBorder:false, mountainBorder:true, edgeBorder:true, isWater:true, isMine:false, isMagic:false, isUnderworld:false, lostTribe:false, adjacent: [16,21,22]}
        
]

