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
    //超时timer ID
    var timeoutId = 0;
    //是否加载超时的一个标志位
    var isTimeout = false;

    //遍历图片数组或者对象
    for(var key in images){
        if(!images.hasOwnProperty(key)){
            continue; //跳出执行下一步遍历
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
    }

}

module.exports = loadImage;
