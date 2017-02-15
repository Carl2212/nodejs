/**
 * Created by Administrator on 2017/2/14.
 */
(function(window){
    var dataload = {
        //假设数据
        showData : function(){
            var item = [];
            for(var i = 0 ; i< 100000 ;i++) {
                item.push({id : i , value : 'wxh想实现工作的价值价值价值呀呀呀呀呀呀呀'+i});
            }
            return item;
        },
        inputData : [],
        lastIndex : 0,
        box : document.getElementById('box'),
        clientH : this.box.clientHeight,//window.innerHeight || document.body.clientHeight,
        idataH : 20,
        startIndex : 0,
        endIndex : 0,
        init : function(){
            //初始化数据
            this.inputData = this.showData();
            this.lastIndex = this.inputData.length - 1;
            //加载3屏数据
            this.load();
            //监听scroll
            this.ListenScroll();
            //最后一条数据
            console.log(this.lastIndex);
            this.insertData(this.lastIndex);
        },
        ListenScroll : function() {
            var me = this;
            this.box.addEventListener('scroll',function(){
                me.load();
                me.removeNonData();
            },true);
        },
        //todo start end （start = (scrolltop - clientHeight)/h ， end = (start + clientHeight/h)）
        load : function() {
            var scrollTop = this.box.scrollTop;
            var screenNum = parseInt(this.clientH / this.idataH)+1;
            var firstIndex = parseInt(scrollTop/this.idataH);
            this.startIndex = firstIndex > screenNum ? firstIndex - screenNum : 0;
            this.endIndex =  this.startIndex + screenNum*2;
            console.log(scrollTop , screenNum , firstIndex , this.startIndex , this.endIndex);
            for(var i = this.startIndex ; i < this.endIndex ;i++) {
                if(!this.contains(this.box,i)) {
                    this.insertData(i);
                }
            }
        },
        contains : function(obj,dataIndex) {
            var child;
            var i = 0;
            while(child = obj.children[i++]){
                var index = child.getAttribute('data-index');
                if(index == dataIndex) {
                    return true;
                }
            }
            return false;
        },
        //todo 添加node 加载到box
        insertData : function(index) {
            var top = this.idataH *index;
            var div = document.createElement('div');
            div.style.top = top + 'px';
            div.setAttribute('class','data-content');
            div.setAttribute('data-index',index);
            div.appendChild(document.createTextNode(this.inputData[index].value));
            this.box.appendChild(div);
        },
        //todo removeNo移除非3屏已加载数据
        removeNonData : function() {
            var child;
            var i = 0;
            while(child = this.box.children[i++]){
                var index = child.getAttribute('data-index');
                if((index < this.startIndex || index > this.endIndex)&& index != this.lastIndex) {
                    this.box.removeChild(child);
                }
            }
        }
    };
    window.dataload = dataload;
})(window);