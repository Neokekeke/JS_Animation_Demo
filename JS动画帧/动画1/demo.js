/**
 * Created by HappyEveryDay on 2018/3/11.
 */

//dom
var rabbit = document.getElementById('rabbit');

//动画关键帧背景图片
var bg = "demo.png";

//动画的位置
var positions = ['0 0','-150 0','-300 0','-450 0','-600 0','-750 0','0 -150','-150 -150','-300 -150','-450 -150','-600 -150','-750 -150'];

animation(rabbit , positions);
//动画计时器实现关键帧
function animation(element , positions){
    var flag = 0; //做为动画帧的下标
    element.style.backgroundImage = `url(${bg})`;
    element.style.backgroundRepeat = `no-repeat`;

    function run(){
        var position = positions[flag].split(' ');
        element.style.backgroundPosition = `${position[0]}px ${position[1]}px`;
        flag++;
        if(flag >= positions.length){
            flag = 0;
        }
        setTimeout(run ,350);
    }
    run();
}