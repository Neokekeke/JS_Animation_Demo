/**
 * Created by neo on 2018/3/12.
 */
'use strict'; // 严格模式下可以避免某些JS引起的错误

var loadImage = require('./imageLoader'); //加载imageLoader的模块
var TimeLine = require('./timeLine');

/**
 * 常量记录帧动画的状态，方便调用接口时的状态记录
 * @type {number}
 */
const STATE_INITIAL = 0; // 动画的初始状态
const STATE_START = 1;   // 动画开始的状态
const STATE_STOP = 2;    // 动画结束的状态

const TASK_SYNC = 0;     // 同步的任务
const TASK_ASYNC = 1;    // 异步的任务

/**
 * Animation的构造函数
 * @constructor
 */
function Animation(){
    this.taskQueue = []; // 任务链,有同步任务和异步任务
    this.index = 0; // 任务链的索引位置
    this.tiemLine = new TimeLine();
    this.state = STATE_INITIAL;
}

/**
 *  **************************************************************************************
 *  帧动画基本方法
 *  **************************************************************************************
 */

/**
 * 这里是一个同步任务，进行图片预加载
 * 因为图片加载是异步的，但是需要执行动画帧时，图片应该是加载完成了
 * @param imgList 图片数组
 */
Animation.prototype.loadImage = function(imgList){
    var taskFn = function(next){
        loadImage(imgList.slice() ,next );
    };

    //任务的类型
    var type = TASK_SYNC;
    return this._add(taskFn , type);
};

/**
 * 这里是一个异步定时任务，通过定时改变图片的位置，实现的帧动画
 * @param ele 需要操作的DOM对象
 * @param positions 背景图片数组位置
 * @param imgUrl  背景图片的地址
 */
Animation.prototype.changePosition = function(ele , positions , imgUrl){

};

/**
 * 这里是一个异步定时任务，通过改变图片image标签的src属性，实现的帧动画
 * @param ele  需要操作的DOM对象
 * @param imgList  背景图片数组
 */
Animation.prototype.changeSrc = function(ele , imgList){

};

/**
 * 这是一个同步方法，可以在上个任务执行完毕后执行的回调函数
 * @param callback  一个回调函数
 */
Animation.prototype.then = function(callback){

};

/**
 * 开始执行任务，异步定时任务执行的间隔
 * @param interval
 */
Animation.prototype.start = function(interval){
    if(this.state == STATE_START){
        return this;
    }
    //如果任务链中没有任务，也返回
    if(!this.taskQueue.length){
        return this;
    }
    this.state = STATE_START;
    this.interval = interval;
    this._runTask(); //执行任务方法
    return this;
};

/**
 * 添加一个同步任务，当需要上一个任务执行结束时，可以回退到上个任务中
 * 重复执行上一个任务的效果，可以定义重复的次数
 * @param times 动画重复次数
 */
Animation.prototype.repeat = function(times){

};

/**
 * 添加一个同步任务，无限循环当前的动画效果
 */
Animation.prototype.repeatForever = function(){

};

/**
 * 设置当前任务结束完到下一个任务开始是的等待时间
 * @param time 等待的时长
 */
Animation.prototype.wait = function(time){

};

/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function(){

};

/**
 * 重新执行被暂停的异步任务
 */
Animation.prototype.restart = function(){

};

/**
 * 释放动画占用的内存资源
 */
Animation.prototype.dispose = function(){

};

/**
 * 这是一个类内部调用的方法，添加一个任务到任务队列
 * @param taskFn 传入的任务方法
 * @param type   任务的类型
 * @private
 */
Animation.prototype._add = function(taskFn , type){
    this.taskQueue.push({
        taskFn : taskFn,
        type : type
    });
    return this; //链式调用的前提
};

/**
 * 开始执行任务
 * @private
 */
Animation.prototype._runTask = function(){
    if(!this.taskQueue || this.state != STATE_START){
        return;
    }
    //任务执行完毕
    if(this.index === this.taskQueue.length){
        this.dispose();
        return;
    }
    var task = this.taskQueue[this.index];
    if(task.type === TASK_SYNC){
        this._syncTask(task);
    }else{
        this._asyncTask(task);
    }
};

/**
 * 同步任务执行
 * @param task  一个任务对象
 * @private
 */
Animation.prototype._syncTask = function(task){
    var that = this;
    var next = function(){
        //切换到下一个任务
        that._next();
    };

    var taskFn = task.taskFn;
    taskFn(next);
};

/**
 * 异步任务执行
 * @param task  一个任务对象
 * @private
 */
Animation.prototype._asyncTask = function(task){
    var that = this;
    var enterFrame = function(time){
        var taskFn = task.taskFn;
        var next = function(){
            //停止当前任务
            that.tiemLine.stop();
            //执行下一个任务
            that._next();
        };
        taskFn(next , time);
    };

    this.tiemLine.onenterFrame = enterFrame;
    this.tiemLine.start(this.interval);

};


/**
 * 切换到下一个任务
 * @private
 */
Animation.prototype._next = function(){
    this.index++;
    this._runTask();
};



/**
 *  **************************************************************************************
 *  帧动画高级方法
 *  **************************************************************************************
 */

/**
 * 帧动画高级用法，添加一个异步定时任务
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFn  自定义每帧动画执行的任务函数
 */
Animation.prototype.enterFrame = function(taskFn){

};





