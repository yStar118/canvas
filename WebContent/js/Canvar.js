/**
 * 
 */

var dom = document.getElementById('clock');//定义一个变量来获取html里canvas的元素
var ctx = dom.getContext('2d');//定义一个变量来获取canvas的上下文。2d表示二维图，目前是唯一合法值
var width =ctx.canvas.width;
var height =ctx.canvas.height;
var r = width/2;
function drawBackground(){
	ctx.save();
	ctx.translate(r,r);//定义圆心
	ctx.beginPath();//画一个路径
	ctx.lineWidth = 10;//路径的宽度
	ctx.arc(0,0,r-5,0,2*Math.PI,false);//设置参数
	ctx.stroke();//开始绘制
	
	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = '18px Arial';//字体属性
	ctx.textAlign = 'center';//左右对齐
	ctx.textBaseline = 'middle';//上下在中间
	hourNumbers.forEach(function(number,i){
		var rad = 2*Math.PI / 12*i;//弧度
		var x = Math.cos(rad) * (r-30);//x坐标
		var y = Math.sin(rad) * (r-30);//y坐标
		ctx.fillText(number,x,y);//在坐标点上填上文本
	});
	
	for (var i=0;i<60;i++){
		
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad)*(r-18);
		var y = Math.sin(rad)*(r-18);
		ctx.beginPath();
		if(i%5==0){
			ctx.fillStyle = '#000';
			ctx.arc(x,y,2,0,2*Math.PI,false);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x,y,2,0,2*Math.PI,false);
		}
		ctx.fill();
	}
	
}

function drawHour(hour,minute){//画时针
	ctx.save();//保存当前画布
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;//时针弧度
	var mard= 2 * Math.PI / 12 / 60 * minute;//分针弧度；
	ctx.rotate(rad + mard);//旋转当前画布
	ctx.lineWidth = 6;//时针宽度
	ctx.lineCap = 'round';//线束端点设置为圆形
	ctx.moveTo(0,10);//时针起始位置坐标
	ctx.lineTo(0,-r / 2)//时针的长度；

	ctx.stroke();
	ctx.restore();//返回之前画布 
	
}
function drawMinute(minute){//分针
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth=3;
	ctx.lineCap='round';
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r+30);
	ctx.stroke();
	ctx.restore();
	
}

function drawSecond(second){
	 ctx.save();
	 ctx.beginPath();
	 ctx.fillStyle='#c14543';
	 var rad = 2*Math.PI/60*second;
	 ctx.rotate(rad);
	 ctx.moveTo(-2,20);
	 ctx.lineTo(2,20);
	 ctx.lineTo(1,-r+18);
	 ctx.lineTo(-1,-r+18);
	 ctx.fill();
	 ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.fillStyle='#fff';
	ctx.arc(0,0,3,2*Math.PI,false);
	ctx.fill();
}



function draw(){
	ctx.clearRect(0,0,width,height);
	var now =new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
setInterval(draw,1000);

