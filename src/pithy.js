(function(){
	Array.dim = function(dimension, initial){
		var a = [], i;
		for(i=0; i<dimension; i+=1){
			a[i] = initial;
		}
		return a;
	};
	Array.matrix = function(m, n, initial){
		var a, i, j, mat = [];
		for(i=0; i<m; i++){
			a = [];
			for(j=0; j<n; j++){
				a[j] = initial;
			}
			mat[i] = a;
		}
		return mat;
	};
	Array.identity = function(n){
		var i, mat = Array.matrix(n, n, 0);
		for(i=0; i<n; i++){
			mat[i][i] = 1;
		}
		return mat;
	};
}());


/**
Memoization
Example
var fibonacci = memoizer([0, 1], function(recur, n){
	return recur(n-1) + recur(n-2);
});
var factorial = memoizer([1, 1], function(recur, n){
	return recur(n-1) * n;
});
*/
var memoizer = function(memo, formula){
	'use strict';
	var recur = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	};
	return recur;
};

// Parts
var eventuality = function(that){
	'use strict';
	var registry = {};

	that.on = function(type, method, parameters){
		var handler = {
			method: method,
			parameters: parameters
		};
		if(registry.hasOwnProperty(type)){
			registry[type].push(handler);
		}
		else{
			registry[type] = [handler];
		}
		return this;
	};

	that.fire = function(event){
		var array,
			func,
			handler,
			i,
			len,
			type = typeof event === 'string' ? event : event.type;

		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i=0, len=array.length; i<len; i++){
				handler = array[i];
				func = handler.method;
				if(typeof func === 'string'){
					func = this[func];
				}
				func.apply(this. handler.parameters || [event]);
			}
		}
		return this;
	};

	return that;
};
//<a href="javascript:void 0;" onclick="toDesktop('http:\/\/qingling.duapp.com', '清凌渡');return false;" class="pull-right">Shortcut</a>
function toDesktop(url, name){
	try{
		var wscript = new ActiveXObject('WScript.Shell');
		var shortcut = wscript.CreateShortcut(wscript.SpecialFolders('Desktop') + '\\' + name + '.url');
		shortcut.TargetPath = url;
		shortcut.Save();
	}
	catch(e){
		alert('当前IE安全级别不允许此操作！');
	}
}
