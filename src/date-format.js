/**
 * 日期格式化输入，format参数和PHP一致
 */
if (!Date.prototype.toFormatString) {
    Date.prototype.toFormatString = (function() {
		function toFormatString(format) {
			var date = this;

			return (format + '').replace(/%([a-zA-Z])/g, function(m, f) {
				var formatter = Date.formats[f];

				if (typeof formatter == 'function') {
					return formatter.call(Date.formats, date);
				} else if (typeof formatter == 'string') {
					return date.toFormatString(formatter);
				}

				return f;
			});
		}

		// Internal helper
		function zeroPad(num) {
			return (+num < 10 ? '0' : '') + num;
		}

		var NUMBERS = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

		Date.formats = {
			// Formatting methods
			y : function(date) {
				return zeroPad(date.getYear() % 100);
			},

			Y : function(date) {
				return date.getFullYear();
			},

			m : function(date) {
				return zeroPad(date.getMonth() + 1);
			},

			b : function(date) {
				return NUMBERS[date.getMonth() + 1];
			},

			B : function(date) {
				return NUMBERS[date.getMonth() + 1] + '月';
			},

			d : function(date) {
				return zeroPad(date.getDate());
			},

			a : function(date) {
				return '周' + NUMBERS[date.getDay()];
			},

			A : function(date) {
				return '星期' + NUMBERS[date.getDay()];
			},

			H : function(date) {
				return date.getHours();
			},

			I : function(date) {
				return date.getHours() % 12 || 12;
			},

			M : function(date) {
				return zeroPad(date.getMinutes());
			},

			S : function(date) {
				return zeroPad(date.getSeconds());
			},

			j : function(date) {
				var jan1 = new Date(date.getFullYear(), 0, 1);
				var diff = date.getTime() - jan1.getTime();

				// 86400000 == 60 * 60 * 24 * 1000
				return Math.ceil(diff / 86400000);
			},

			// Format shorthands
			D : '%m/%d/%y',
			F : '%Y-%m-%d',
			T : '%H:%M:%S'
		};

		return toFormatString;
	})();
}
