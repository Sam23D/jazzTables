 
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
    jsonObjectTable : null,
    
  },
  
  parseTable : function(  ){ //generates de json object from an already rendered table
    var jsonBuffer = [];
    var auxjsonObjectTableBuffer = {};
    auxjsonObjectTableBuffer.head = _.first(this.tableElement.rows);
    auxjsonObjectTableBuffer.body = _.rest(this.tableElement.rows);
    
    this.jsonObjectTable = auxjsonObjectTableBuffer;
      
    //obtains the clumn key identifiers
    auxjsonObjectTableBuffer.head.id = _.uniqueId("jazz-row-");
    var auxKeys = _.map(auxjsonObjectTableBuffer.head.cells, function(cell){
      return cell.innerHTML;
    });
    this.jazzModel.sortingKeys = auxKeys;
    
    console.log("column keys to be used", auxKeys);
    
    _.each( _.values( auxjsonObjectTableBuffer.body ), function(element, index, list ){
      element.id = _.uniqueId("jazz-row-");
      var auxCellsValues =  _.map(element.cells, function(cell){
        return cell.innerHTML;
      });
      var auxJsonBufferRow = _.object(_.zip( auxKeys, auxCellsValues ));
      
      jsonBuffer.push( auxJsonBufferRow );
      
    });
      
    console.log( jsonBuffer );
    this.jazzModel.jsonObjectTable = jsonBuffer;
  },
  renderTable : function(){
    
  },
  jazzRenderingElement : {
    
  }
  
};



var onReady = function(){
  
  jazzTableElement = new JazzTable( "table1" );
  jazzTableElement.parseTable();
};