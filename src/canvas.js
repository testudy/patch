/*
 * 定义一个以（x，y）为中心，半径为r的规则n边形，每个定点都规则的分布在圆周上
 * 将第一个顶点放置在最上面，或者指定一定角度
 * 除非最后一个参数为true，否则顺时针旋转
 */
function polygon(context, n, x, y, r, angle, counterclockwise){
	var delta = 2 * Math.PI / n, i;
	angle = angle || 0;
	counterclockwise = counterclockwise || false;

	context.moveTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
	for(i=1; i<n; i++){
		angle += counterclockwise ? -delta : delta;
		context.lineTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
	}

	context.closePath();
}

/*
 * 恢复最后一次保存的图形状态，并让该状态从栈中弹出
 */
CanvasRenderingContext2D.prototype.revert = function(){
	this.restore();
	this.save();
	return this;
};

CanvasRenderingContext2D.prototype.attrs = function(attrs){
	if(attrs){
		for(var name in attrs){
			this[name] = attrs[name];
		}
		return this;
	}
	else{
		return {
			fillStyle: this.fillStyle,
			font: this.font,
			globalAlpha: this.globalAlpha,
			globalCompositeOperation: this.globalCompositeOperation,
			lineCap: this.lineCap,
			lineJoin: this.lineJoin,
			lineWidth: this.lineWidth,
			miterLimit: this.miterLimit,
			textAlign: this.textAlign,
			textBaseline: this.textBaseline,
			shadowBlur: this.shadowBlur,
			shadowColor: this.shadowColor,
			shadowOffsetX: this.shadowOffsetX,
			shadowOffsetY: this.shadowOffsetY,
			strokeStyle: this.strokeStyle
		};
	}
};
