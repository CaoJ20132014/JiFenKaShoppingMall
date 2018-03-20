import Cookie from 'js-cookie';
const PublicMethod = {
    /**
     * @param {type} set设置, get获取, remove移除
     * @param {name} cookie 别名
     * @param {data} cookie 数据
     * @param {time} cookie 过期时间
     * @param {Path} cookie 路径
     */
    JS_Cookie: (type, name, data, time, Path) => {
        if (Path) {
            if (type == 'set' && name && data) {
                Cookie.set(name, data, { expires: time, path: Path });
            } else if (type == 'get' && name && !data) {
                return Cookie.getJSON(name);
            } else if (type == 'remove' && name && data && time && Path) {
                Cookie.remove(name, { path: Path });
            }
        } else {
            if (type == 'set' && name && data) {
                Cookie.set(name, data, { expires: time });
            } else if (type == 'get' && name && !data) {
                return Cookie.getJSON(name);
            } else if (type == 'remove' && name && !data) {
                Cookie.remove(name);
            }
        }
    },
    /**
     * @param {time} 时间字符串 s20 表示20秒，m30 表示30分钟 h12 表示12小时 d30 表示30天 new Date()时间戳转对象
	 * @returns {object}
     */
    setTimes: (time) => {
        let date = new Date();
        let str1 = time.substring(1, time.length) * 1;
        let str2 = time.substring(0, 1);
        if (str2 == 's') {
            return new Date(date.setTime(date.getTime() + 1000 * str1));
        } else if (str2 == 'm') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * str1));
        } else if (str2 == 'h') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * str1));
        } else if (str2 == 'd') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * str1));
        } else if (str2 == 'D') {
            return new Date(date.setTime(date.getTime() - 1000 * 60 * 60 * 24 * str1));
        }
    },
    /**
     * @desc 用来得到精确的乘法结果（因为两个浮点数相乘存在误差）
     * @param {arg1}
     * @param {arg2}
	 * @returns {number}
     */
    Ride: (arg1, arg2) => {
        let m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try { 
            m += s1.split(".")[1].length 
        } catch (e) { };
        try { 
            m += s2.split(".")[1].length 
        } catch (e) { };
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    /**
     * @desc 用来得到精确的加法结果（因为两个浮点数相加存在误差）
     * @param {arg1}
     * @param {arg2}
	 * @returns {number}
     */
    Additive: (arg1, arg2) => {
        let r1,
            r2,
            m,
            c;
        try { 
            r1 = arg1.toString().split(".")[1].length 
        } catch (e) { 
            r1 = 0 
        };
        try { 
            r2 = arg2.toString().split(".")[1].length 
        } catch (e) { 
            r2 = 0 
        };
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            let cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            }
            else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    },
    /**
     * @desc 用来得到精确的减法结果（因为两个浮点数相减存在误差）
     * @param {arg1}
     * @param {arg2}
     * @returns {number}
     */
    Reduce: (arg1, arg2) => {
        let r1, r2, m, n;
        try { 
            r1 = arg1.toString().split(".")[1].length 
        } catch (e) { 
            r1 = 0 
        };
        try { 
            r2 = arg2.toString().split(".")[1].length 
        } catch (e) { 
            r2 = 0 
        };
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;       //动态控制精度长度
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    /**
     * @desc 实现数据的四舍五入
     * @param {v} 需要四舍五入的数据
     * @param {x} 保留小数点后x位
	 * @returns {number}
     */
    Rounding: (v, x) => {
        let isNegative = false;
        if (v < 0) {                //如果是负数
            isNegative = true;
            v = -v;
        }
        let IValue = 1;
        for (let i = 1; i <= x; i++) {
            IValue = IValue * 10;
        }
        let Int = Math.round(v * IValue, 0);
        v = Int / IValue;
        if (isNegative) {
            v = -v;
        }
        return v;
    },
    /**
     * @desc 格式化处理字符串
     * @param {str} 需要格式化处理的字符串
     * @param {size} 按照几个单位分割字符串，默认是3
     * @param {delimiter} 需要添加进去的字符串，默认是","
     * @returns {string} 格式化后的字符串
     */
    formatText: (str, size, delimiter) => {
        let _size = size || 3,
            _delimiter = delimiter || ',';
        let regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
        let reg = new RegExp(regText, 'g');
        return str.replace(reg, _delimiter);
    },
    /**
     * @desc 验证身份证号码
     * @param {idCard} 需要验证的身份证号码
     * @returns {boolean}
     */
    isIdCard: (idCard) => {
        // 15位和18位身份证号码的正则表达式
        let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        // 如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
            if (idCard.length == 18) {
                let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 	// 将前17位加权因子保存在数组里
                let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); 						// 这是除以11后，可能产生的11位余数、验证码，也保存成数组
                let idCardWiSum = 0; 	// 用来保存前17位各自乖以加权因子后的总和
                for (let i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }
                let idCardMod = idCardWiSum % 11; 			// 计算出校验码所在数组的位置
                let idCardLast = idCard.substring(17); 		// 得到最后一位身份证号码
                // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        return true;
                    } else {
                        return false;
                    }
                } else {	// 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    },
    /**
     * @desc 验证银行卡号码
     * @param {idCard} 需要验证的银行卡号码
     * @returns {boolean}
     */
    isBankCard(card) {
        let lastNum = card.substr(card.length - 1, 1);      	//取出最后一位（与luhn进行比较）
        let first15Num = card.substr(0, card.length - 1);   	//前15或18位
        let newArr = new Array();
        for (let i = first15Num.length - 1; i > -1; i--) {      //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        let arrJiShu = new Array();                             //奇数位*2的积 <9
        let arrJiShu2 = new Array();                            //奇数位*2的积 >9
        let arrOuShu = new Array();                             //偶数位数组
        for (let j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {                             //奇数位
                if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
                else arrJiShu2.push(parseInt(newArr[j]) * 2);
            } else {                                             //偶数位
                arrOuShu.push(newArr[j]);
            }
        }
        let jishu_child1 = new Array();                         //奇数位*2 >9 的分割之后的数组个位数
        let jishu_child2 = new Array();                         //奇数位*2 >9 的分割之后的数组十位数
        for (let h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }
        let sumJiShu = 0;                                       //奇数位*2 < 9 的数组之和
        let sumOuShu = 0;                                       //偶数位数组之和
        let sumJiShuChild1 = 0;                                 //奇数位*2 >9 的分割之后的数组个位数之和
        let sumJiShuChild2 = 0;                                 //奇数位*2 >9 的分割之后的数组十位数之和
        let sumTotal = 0;
        for (let m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }
        for (let n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }
        for (let p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);	//计算总和
        let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;	//计算luhn值
        let luhn = 10 - k;
        if (lastNum == luhn) {
            return true;
        } else {
            return false;
        }
    }
}
export default PublicMethod;