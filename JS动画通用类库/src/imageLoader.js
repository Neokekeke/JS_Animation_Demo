/**
 * Created by neo on 2018/3/12.
 */

/**
 * 图片预加载类库
 */

'use strict';

/**
 * 预加载图片函数
 * @param images  加载图片的数组或者对象，比如传入一组图片地址数组
 * @param callback 全部图片加载完成的回调函数
 * @param timeout  加载超时的时长，计时的目的是为了，避免有时图片加载太慢产生的阻塞，提供一个最大的超时时间，也相当于执行了回到函数
 */
function loadImage(images , callback , timeout){
    //全部图片加载完成的计时器
    var count = 0;
    //全部图片加载成功的一个标志位
    var success = true;
    //超时计时器timer ID
    var timeoutId = 0;
    //是否加载超时的一个标志位
    var isTimeout = false;

    //遍历图片数组或者对象
    for(var key in images){
        if(!images.hasOwnProperty(key)){
            continue; //跳出执行下一次遍历
        }

        //获取每个图片元素
        //期望格式是：object：{src：xxx}，以对象方式获取图片地址
        var item = images[key];
        if(typeof item === "string"){
            item = images[key] = {
                src : item
            }
        }

        //如果格式不满足期望时，则丢弃这条数据进行下一次遍历
        if(!item || !item.src){
            continue;
        }

        //如果item都满足期望的话，则给图片加载计时器加一
        count++;
        //设置图片元素的ID
        item.id = "__img__" + key + getId();
        //设置图片元素的img，它是个Image对象
        item.img = new Image();

        //开始加载图片
        doLoad(item);
    }

    //遍历完成时，如果计时器为0时，则直接执行callback函数
    if(!count){
        callback(success);
    }else if(timeout){
        timeoutId = setTimeout(onTimeOut , timeout); //超时计时函数
    }

    /**
     * 真正进行图片加载的函数
     * @param item 图片元素对象
     */
    function doLoad(item){
        item.status = "loading";
        var img = item.img;
        img.onload = function(){
            success = success & true; //当图片都成功加载时才为true
            item.status = "loaded";
            done();
        };

        img.onerror = function(){
            success = false;
            item.status = "error";
            done();
        };

        //这里发起了一个http(s)请求
        img.src = item.src;

        /**
         * 每张图片加载完成之后执行的回调函数，无论成功加载还是失败
         */
        function done(){
            //解除事件绑定函数
            img.onload = img.onerror = null;

            try{
                delete window[item.id];
            }catch (e){

            }

            //每张图片加载完成，计数器减一，当所有图片加载完成且没有超时的情况
            //清除超时计时器，并执行回调函数
            if(!--count && !isTimeout){
                clearTimeout(timeoutId);
                callback(success);
            }
        }
    }

    //一个超时函数
    function onTimeOut(){
        isTimeout = true;
        callback(false);
    }

}

//commonjs
var __id = 0; //闭包环境下__id的值会被保存
function getId(){
    return ++__id;
}

module.exports = loadImage;
