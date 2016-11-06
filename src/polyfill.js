/* polyfill
 * Fix Firefox outerHTML
 */
(function(){
	// Patch indexOf for
	if (Array.prototype.indexOf === undefined) {
		Array.prototype.indexOf = function(value /*, from*/) {
			var len = this.length, 
				from = (Number(arguments[1]) || 0) >> 0;
			if (from < 0) {
				from += len;
			}
			for (; from < len; from++) {
				if (from in this && this[from] === value) {
					return from;
				}
			}
			return -1;
		};
	}

    if(typeof(HTMLElement) != "undefined" && !document.body.outerHTML){
        HTMLElement.prototype.__defineSetter__("outerHTML", function(s){
            var r = this.ownerDocument.createRange();
            r.setStartBefore(this);
            var df = r.createContextualFragment(s);
            this.parentNode.replaceChild(df, this);
            return s;
        });
        HTMLElement.prototype.__defineGetter__("outerHTML", function(){
            var a = this.attributes, str = "<" + this.tagName, i = 0;
            for (; i < a.length; i++)
                if (a[i].specified)
                    str += " " + a[i].name + '="' + a[i].value + '"';
            if (!this.canHaveChildren)
                return str + " />";
            return str + ">" + this.innerHTML + "</" + this.tagName + ">";
        });
    
        HTMLElement.prototype.__defineGetter__("canHaveChildren", function(){
            return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase());
        });
    }
}());
