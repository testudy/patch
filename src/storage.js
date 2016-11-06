(function(window, undefined){
	function UserDataStorage(maxage){
		//var storage = window.document.createElement('div');
		//var storage = document.body;
		var storage = document.documentElement;
		//storage.style.display = 'none';
		storage.style.behavior = 'url("#default#userData")';
		//window.document.body.appendChild(storage);

		if(maxage){
			var now = new Date().getTime();
			var expires = now + maxage * 1000;
			storage.expires = new Date(expires).toUTCString();
		}

		storage.load('UserDataStorage');

		var that = this,
			identifier = '_keys',
			separator = '|',
			_keys,
			keys,
			prependKey = function(name){
				if(name!=identifier && !~keys.indexOf(name)){
					keys.push(name);
					that.setItem(identifier, keys.join('|'));
					that.length = keys.length;
				}
			},
			deleteKey = function(name){
				var index = keys.indexOf(name);
				if(~index){
					keys.splice(index, 1);
					that.setItem(identifier, keys.join('|'));
					that.length = keys.length;
				}
			};

		this.setItem = function(name, value){
			prependKey(name);
			storage.setAttribute(name, value);
			storage.save('UserDataStorage');
		};

		this.getItem = function(name){
			return storage.getAttribute(name) || null;
		};

		this.removeItem = function(name){
			deleteKey(name);
			storage.removeAttribute(name);
			storage.save('UserDataStorage');
		};

		//  firefox 17 倒序排列
		this.key = function(index){
			return keys[index];
		};

		this.clear = function(){
			for(var i=0, len=this.length; i<len; i++){
				this.removeItem(keys[i]);
			}
		};

		_keys = this.getItem(identifier);
		if(!_keys){
			keys = [];
			this.setItem(identifier, '');
		}
		else{
			keys = _keys.split(separator);
		}

		this.length = keys.length - 1;

	}

	// isIE = !-[1,]
	var isIE = (/msie/i.test(navigator.userAgent)) && !(/opera/i.test(navigator.userAgent));
	function CookieStorage(maxage, path){
		var cookie = (function(){
			var cookie = {};
			var all = document.cookie;
			if(all == ''){
				return cookie;
			}
			var list = all.split('; ');
			for(var i=0, len=list.length; i<len; i++){
				var c = list[i];
				var p = c.indexOf('=');
				var name = decodeURIComponent(c.substring(0, p));
				var value = decodeURIComponent(c.substring(p+1));
				cookie[name] = value;
			}
			return cookie;
		}());
    
		var keys = [];
		for(var key in cookie){
			keys.push(key);
		}
    
		this.length = keys.length;
    
		this.key = function(index){
			return keys[index] || null;
		};
    
		this.setItem = function(name, value){
			if(!(name in cookie)){
				keys.push(name);
				this.length++;
			}
			cookie[name] = value;
    
			var c = encodeURIComponent(name) + '=' + encodeURICompent(value);
    
			if(maxage){
				if(isIE){
					var expires = new Date();
					expires = expires.setTime(expires.getTime() + maxage * 1000);
					c += '; expires=' + expires.toGMTString();
				}
				else{
					c += '; max-age=' + maxage;
				}
			}
    
			if(path){
				c += '; path=' + path;
			}
    
			document.cookie = c;
		};
    
		this.getItem = function(name){
			return cookie[name] || null;
		};
		
		this.removeItem = function(name){
			if(!(name in cookie)){
				return;
			}
    
			delete cookie[name];
    
			keys.splice(keys.indexOf(name), 1);
    
			this.length--;
    
			if(isIE){
				document.cookie = encodeURIComponent(name) + '=; expires=' + new Date(0).toGMTString();
			}
			else{
				document.cookie = encodeURIComponent(name) + '=; max-age=0';
			}
		};
    
		this.clear = function(){
			for(var i=0, len=keys.length; i<len; i++){
				if(isIE){
					document.cookie = encodeURIComponent(keys[i]) + '=; expires=' + new Date(0).toGMTString();
				}
				else{
					document.cookie = encodeURIComponent(keys[i]) + '=; max-age=0';
				}
			}
			cookie = {};
			keys = [];
			this.length = 0;
		};
	}

	if(window.localStorage === undefined){
		if(window.globalStorage){
			window.localStorage = window.globalStorage[location.host];
		}
		else if(isIE){
			window.localStorage = new UserDataStorage();
		}
		else{
			// Next 将Cookie更改为子Cookie的形式
			window.localStorage = new CookieStorage(365*12*60*60);
		}
	}
}(this));
