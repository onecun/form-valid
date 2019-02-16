class Validator {
    constructor(val, rule) {
        this.val = val
        this.rule = rule
        this.ruleMethod = {
            max: 'validateMax',
            min: 'validateMin',
            maxlength: 'validateMaxlength',
            minlength: 'validateMinlength',
            numeric: 'validateNumeric',
            required: 'validateRequired',
            pattern: 'validatePattern',
        }
    }

    valid(newVal = '') {
        if (newVal !== undefined) {
            this.val = newVal
        }
        // 非必填项同时没填内容直接判定为 合法
        if (!this.rule.required && !this.val) {
            return true
        }
        for (let key in this.rule) {
            // 防止重复验证
            if (key === 'required') {
                continue
            }
            // 调用 rule 中相对应的方法
            let methodName = this.ruleMethod[key]
            let r = this[methodName]()
            if (!r) {
                return false
            }
        }
        return true
    }

    // 验证最大值
    validateMax() {
        this._preMaxMin()
        return this.val <= this.rule.max
    }
    // 验证最小值
    validateMin() {
        this._preMaxMin()
        return this.val >= this.rule.min
    }
    // 验证最大长度
    validateMaxlength() {
        this._preLength()
        return this.val.length <= this.rule.maxlength
    }
    // 验证最小长度
    validateMinlength() {
        this._preLength()
        return this.val.length >= this.rule.minlength
    }
    // 验证是否为 数字
    validateNumeric() {
        let real = this._preStrip()
        if (real === '') {
            real = undefined
        }
        let v = Number(real)
        return !isNaN(v)
    }
    // 验证是否为 必填项
    validateRequired() {
        let real = this._preStrip() 
        return !(!real && real !== 0)
    }
    // 验证是否匹配 对应模式(pattern)
    validatePattern() {
        let reg = new RegExp(this.rule.pattern)
        return reg.test(this.val)
    }

    /* 用于完成 validateMax 和 validateMin 的前置工作 */
    _preMaxMin() {
        this.val = parseFloat(this.val)
    }

    /* 用于完成 validateMaxlength 和 validateMinlength 的前置工作 */
    _preLength() {
        this.val = this.val.toString()
    }
    /* 用于完成 去除空格 */
    _preStrip() {
        let strip_right = function (s) {
            var num = 0
            var len = s.length
            for (var i = len - 1; i > -1; i--) {
                if (s[i] != " ") {
                    num = i + 1
                    //log(num)
                    break
                }
            }
            var str = s.slice(0, num)
            //log(str)
            return str
        }
        let strip_left = function (s) {
            var num = s.length
            for (var i = 0; i < s.length; i++) {
                if (s[i] != " ") {
                    num = i
                    //log(num)
                    break
                }
            }
            var str = s.slice(num)
            //log(str)
            return str
        }
        let strip = function (s) {
            var str = strip_right(strip_left(s))
            // log(s)
            return str
        }
        return strip(this.val)
    }
}