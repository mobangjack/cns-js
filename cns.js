/**
 * Copyright (c) 2017, Jack Mo (mobangjack@foxmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*************************************************************************/
/*                 Any2Any Number System Converter                       */
/*************************************************************************/

// Convert Number System
var cns = {
	
	// Digits object
	digits : {
		
		// Symbolic access
		at : function(idx) {
			if (idx >= 0 && idx <=9)
				return String.fromCharCode('0'.charCodeAt() + idx);
			else if (idx >= 10 && idx <= 35)
				return String.fromCharCode('a'.charCodeAt() + idx - 10);
			else return null;
		},

		// Numerical access
		of : function(sym) {
			var ascii = sym.charCodeAt();
			if (ascii >= '0'.charCodeAt() && ascii <= '9'.charCodeAt())
				return ascii - '0'.charCodeAt();
			else if (ascii >= 'a'.charCodeAt() && ascii <= 'z'.charCodeAt())
				return 10 + ascii - 'a'.charCodeAt();
			else return null;
		},
	},

	// Convert any number system to decimal
	any2dec : function(exp, base) {
		var decimal = 0;
		var weight = 1;
		for (var i = exp.length - 1; i >= 0; i--) {
			decimal += this.digits.of(exp.charAt(i)) * weight;
			weight *= base;
		}
		return decimal;
	},

	// Convert decimal number to any other number system
	dec2any : function(dec, base) {
		var quotient = parseInt(dec / base);
		var remainder = dec % base;
		var result = [];
		while (quotient != 0) {
			result.unshift(this.digits.at(remainder));
			remainder = quotient % base;
			quotient = parseInt(quotient / base);
		}
		result.unshift(this.digits.at(remainder));
		return result.join('');
	},

	// Any2Any number system conversion
	any2any : function(src, src_base, dst_base) {
		var dec = this.any2dec(src, src_base);
		var ret = this.dec2any(dec, dst_base);
		return ret;
	},
	
	// Convert command
	cvt : function(src, src_base, dst_base) {
		return this.any2any(src, this.digits.of(src_base) + 1, this.digits.of(dst_base) + 1);
	},
}

// Module export
module.exports = cns;
