export const csvJSON = (csvStr) => {
    var lines=csvStr.split("\n");
    var result = [];
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[j] = currentline[j];
        }
  
        result.push(obj);
  
    }
    return result;
}