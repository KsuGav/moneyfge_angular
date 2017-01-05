window.onload = (function(){
    var widget_id = 853271;
    _shcp =[{widget_id : widget_id, side: 'left', position: 'bottom'}];
    /*var lang =(navigator.language || navigator.systemLanguage
     || navigator.userLanguage ||"en")
     .substr(0,2).toLowerCase();
     var url ="widget.siteheart.com/widget/sh/"+ widget_id +"/"+ lang +"/widget.js";*/
    var url ="widget.siteheart.com/widget/sh/"+ widget_id +"/en/widget.js";
    var hcc = document.createElement("script");
    hcc.type ="text/javascript";
    hcc.async =true;
    hcc.src =("https:"== document.location.protocol ?"https":"http")
        +"://"+ url;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hcc, s.nextSibling);
})();
