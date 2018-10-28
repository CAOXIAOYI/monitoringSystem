"use strict";

function privilege() {

}

privilege.prototype.isPrivilege = function(privilege,index) {

   let binary = this.fullPrivilege(privilege);
   return binary.substring(index,index+1) === "1";
}       


privilege.prototype.binaryToDecimalism = function(binary) {
  return parseInt(binary,2);
}

privilege.prototype.decimalismToBinary = function(decimalism) {
  return this.fullPrivilege(decimalism);
};
privilege.prototype.setPrivilege = function(privilege,index) {
  let binary = this.decimalismToBinary(privilege);
  console.log("binary",binary);
  let _newStr = "";
  if(binary.substring(index,index+1) === "1"){
    _newStr = this.replaceChat(binary,index,"0");
  }else{
    _newStr = this.replaceChat(binary,index,"1");
  }
  return this.binaryToDecimalism(_newStr);
};

privilege.prototype.replaceChat = function(source,pos,newChar){  
     if(pos<0||pos>=source.length||source.length==0){  
         return "invalid parameters...";  
     }  
     var iBeginPos= 0, iEndPos=source.length;  
     var sFrontPart=source.substr(iBeginPos,pos);  
     var sTailPart=source.substr(pos+1,source.length);  
     var sRet=sFrontPart+newChar+sTailPart;  
     return sRet;  
}
privilege.prototype.fullPrivilege = function(privilege){  

     let binary = privilege.toString(2);
     if(binary.length<11){
      let zero="";
      for(let i = 0;i<(11-binary.length);i++){
        zero = zero+"0";
      }
      binary = zero + binary;
     }
     return binary;  
} 

module.exports = new privilege();
