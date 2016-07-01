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
    
    sortingOrder : "",
    sortingKeys : [],
    jsonObjectTable : {},     //json representation of data
    tableObject:(function(){  //table object of the jsonObjectTable
      var auxTableBuffer = document.createElement("table");
      var auxTableBufferHead = auxTableBuffer.createTHead();
      auxTableBufferHead.id = "jazz-head";
      var auxTableBufferBody = auxTableBuffer.appendChild( document.createElement("tbody"));
      auxTableBufferBody.id = "jazz-body";
      
      return auxTableBuffer;
    })(),
    // displayingBuffer properties
    
  },


  parseTable : function(){ //generates de json object from an already rendered table
    var jsonBuffer = [];
    var auxjsonObjectTableBuffer = {};
    auxjsonObjectTableBuffer.head = _.first(this.tableElement.rows);
    auxjsonObjectTableBuffer.body = _.rest(this.tableElement.rows);
    
    this.jsonObjectTable = auxjsonObjectTableBuffer;
      
    var auxKeys = _.map(auxjsonObjectTableBuffer.head.cells, function(cell){
      return cell.innerHTML;
    });
    this.jazzModel.sortingKeys = auxKeys;
    
    //console.log("column keys to be used", auxKeys);
    
    _.each( _.values( auxjsonObjectTableBuffer.body ), function(element, index, list ){
      
      var auxCellsValues =  _.map(element.cells, function(cell){
        return cell.innerHTML;
      });
      var auxJsonBufferRow = _.object(_.zip( auxKeys, auxCellsValues ));
      
      jsonBuffer.push( auxJsonBufferRow );
      
    });
      
    this.jazzModel.jsonObjectTable = jsonBuffer;
  },
  
  
  renderTable : function(){
    
    var auxTableBuffer = document.createElement("table");
    //Definition of table Head
    var auxTableBufferHead = auxTableBuffer.createTHead();
    auxTableBufferHead.id = "jazz-head";
    var auxTr = document.createElement("tr");
    _.each( this.jazzModel.sortingKeys, function( key  ){
      var auxTh = document.createElement("th");
      //#TODO add cell identifier
      auxTh.innerHTML = key;
      auxTr.appendChild( auxTh  );
    });
    auxTableBufferHead.appendChild( auxTr );
    //Definition of table Body
    var auxTableBufferBody = auxTableBuffer.appendChild( document.createElement("tbody"));
    auxTableBufferBody.id = "jazz-body";
    //Append rows to body
    var sortingKeys = this.jazzModel.sortingKeys;
    _.each( this.jazzModel.jsonObjectTable, function( row ){
      
      var auxTr = document.createElement("tr");
      //Append each value to the row
      _.each( sortingKeys , function( key ){
        var auxTd = document.createElement("td");
        //#TODO add cell identifier
        auxTd.innerHTML = row[key];
        auxTr.appendChild( auxTd);
      });
      auxTableBufferBody.appendChild( auxTr);
    
    });
    //console.log( auxTableBuffer );
    this.jazzModel.tableObject = auxTableBuffer;
  },
  
  
  generateTable : function(){
    
    var auxTableBuffer = document.createElement("table");
    
    //Definition of table Head
    this.renderHead();
    //Definition of table Body
    var auxTableBufferBody = auxTableBuffer.appendChild( document.createElement("tbody"));
    auxTableBufferBody.id = "jazz-body";
    //Append rows to body
    var sortingKeys = this.jazzModel.sortingKeys;
    _.each( this.jazzModel.jsonObjectTable, function( row ){
      
      var auxTr = document.createElement("tr");
      //Append each value to the row
      _.each( sortingKeys , function( key ){
        var auxTd = document.createElement("td");
        //#TODO add cell identifier
        auxTd.innerHTML = row[key];
        auxTr.appendChild( auxTd);
      });
      auxTableBufferBody.appendChild( auxTr);
    
    });
    //console.log( auxTableBuffer );
    this.jazzModel.tableObject = auxTableBuffer;
  },
  
  
  renderHead: function(){
    this.jazzModel.tableObject.tHead = document.createElement("thead");
    var tableHead = this.jazzModel.tableObject.tHead;
    
    
    var auxTr = document.createElement("tr");
    _.each( this.jazzModel.sortingKeys, function( key  ){
    
      var auxTh = document.createElement("th");
      //#TODO add cell identifier
      auxTh.innerHTML = key;
      auxTr.appendChild( auxTh  );
    
      
    });
    tableHead.appendChild( auxTr );
    //console.log( tableHead);
  },
  
  
  renderBody: function(){
    
    this.jazzModel.tableObject.tBodies[0] = document.createElement("tbody");
    var tableBody = this.jazzModel.tableObject.tBodies[0];
    
    var sortingKeys = this.jazzModel.sortingKeys;
    _.each( this.jazzModel.jsonObjectTable, function( row ){
      
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
    
    
    console.log( tableBody);
    
  },
  
  
};



var onReady = function(){
  
  jazzTableElement = new JazzTable( "table1" );
  jazzTableElement.parseTable();
  
};