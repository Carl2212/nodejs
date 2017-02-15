/**
 * Created by Administrator on 2017/2/14.
 */
(function(window){
    var polling = function(type,url,params){
        type = type || 'GET';
        params = params || null;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == '4') {
                var txt = document.createElement('div');
                var tt ;
                try{
                    tt = JSON.parse(xhr.responseText);
                }catch(e){};
                var msg = tt.msg ? tt.msg : '';
                txt.innerText = msg;
                document.body.appendChild(txt);
                xhr.onreadystatechange = null;
            }
        }
        xhr.open(type,url,true);
        xhr.send(type == 'GET' ? null : params);
    }
    setInterval(function(){
        polling('get','/testUser');
    },1000);

})(window);