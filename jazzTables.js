var jazzTableElement = null;



//Library
var JazzTable = function( tableId ){
  
  
  //porperties
  this.tableElement = {};
  
  //constructor
  var auxIdChecher = document.getElementById( tableId );
  if( auxIdChecher !== null ){
    this.tableElement = auxIdChecher;
  }else{
    console.error("No element with id " + tableId + " refered to null Object instead");
  }
  
};


JazzTable.prototype = {
  jazzModel : {
    
    backUpJSON : {},          //json representation of table data
    backUpTable:(function(){  //table object of the backUpJSON
      var auxTableBuffer = document.createElement("table");
      var auxTableBufferHead = auxTableBuffer.createTHead();
      auxTableBufferHead.id = "jazz-head";
      var auxTableBufferBody = auxTableBuffer.appendChild( document.createElement("tbody"));
      auxTableBufferBody.id = "jazz-body";
      
      return auxTableBuffer;
    })(),
    // object that will be used as buffer for html renderization
    bufferData : {
      
    }
  },
  getKeys : function(){//returns all the keys that exists in the json data
    //#TODO verify that data is not null
    return _.keys(this.jazzModel.backUpJSON[0]);
    
  },
  parseTable : function(){ //generates de json object from an already rendered table
    var jsonBuffer = [];
    var auxjsonObjectTableBuffer = {};
    auxjsonObjectTableBuffer.head = _.first(this.tableElement.rows);
    auxjsonObjectTableBuffer.body = _.rest(this.tableElement.rows);

    var auxKeys = _.map(auxjsonObjectTableBuffer.head.cells, function(cell){
      return cell.innerHTML;
    });

    _.each( _.values( auxjsonObjectTableBuffer.body ), function(element, index, list ){
      
      var auxCellsValues =  _.map(element.cells, function(cell){

        return cell.innerHTML;

      });

      var auxJsonBufferRow = _.object(_.zip( auxKeys, auxCellsValues ));
      jsonBuffer.push( auxJsonBufferRow );
      
    });
      
    this.jazzModel.backUpJSON = jsonBuffer;
  },
  generateTable : function(){//updates current table
    
    var auxTableBuffer = document.createElement("table");
    //Refresh jazzTable.jazzModel.backUpTable
    this.renderHead( this.getKeys() );
    //Refresh jazzTable.jazzModel.backUpTable
    this.renderBody( this.jazzModel.backUpJSON  );
    
  },
  
  
  renderHead: function( columnsList ){//updates curent jazzModel.objectTable's head
    this.jazzModel.backUpTable.tHead = document.createElement("thead");
    var tableHead = this.jazzModel.backUpTable.tHead;
    var auxTr = document.createElement("tr");
    _.each( columnsList , function( key  ){
    
      var auxTh = document.createElement("th");
      //#TODO add cell identifier
      auxTh.innerHTML = key;
      auxTr.appendChild( auxTh  );
    
      
    });
    tableHead.appendChild( auxTr );
    //console.log( tableHead);
  },
  
  
  renderBody: function( jsonObject ){//updates curent jazzModel.objectTable's body
    
    this.jazzModel.backUpTable.tBodies[0] = document.createElement("tbody");
    var tableBody = this.jazzModel.backUpTable.tBodies[0];
    tableBody.id = "jazz-body";
    var sortingKeys = this.getKeys();//head of the table
    _.each( jsonObject, function( row ){
      
      var auxTr = document.createElement("tr");
      //Append each value to the row
      _.each( sortingKeys , function( key ){
        var auxTd = document.createElement("td");
        //#TODO add cell identifier
        auxTd.innerHTML = row[key];
        auxTr.appendChild( auxTd);
      });
      tableBody.appendChild( auxTr);
      
    });
    
  },
  
  
};



var onReady = function(){
  
  jazzTableElement = new JazzTable( "table1" );
  jazzTableElement.parseTable();
  
};