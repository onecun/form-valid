class Input {
    constructor(element) {
        // this.ele = e(selector)
        this.ele = element
        // this.eleError
        this.rule = {
            required: true,
        }
        this.init()
    }

    init() {
        this._parseRule()
        this.loadValidator()
        this.listen()
        this.findError()
    }

    // 每次改动 val, 自动验证
    listen() {
        let me = this
        bindEvent(this.ele, 'blur', function(event) {
            let r = me.validator.valid(me.getValue())
            if(!r) {
                show(me.eleError)
            } else {
                hide(me.eleError)
            }
        })
    }

    getValue() {
        return this.ele.value
    }

    // 加载 验证器
    loadValidator() {
        let val = this.getValue()
        this.validator = new Validator(val, this.rule)
    }

    // 解析规则
    _parseRule() {
        let ruleStr = this.ele.dataset.rule
        if (!ruleStr) {
            return
        }
        /* 
            rule 格式
            data-rule='maxlength:10|minlength:2'
        */
        let ruleArr = ruleStr.split('|')
        /*  格式解析1
            [
                'maxlength:10',
                'minlength:2',
            ] 
        */
        for (let i = 0; i < ruleArr.length; i++) {
            let item = ruleArr[i]
            let itemArr = item.split(':')
            /*  格式解析2
                [
                    'maxlength', '10' 
                ] 
            */
            let k = itemArr[0]
            let v = JSON.parse(itemArr[1])
            this.rule[k] = v
        }
    }

    // 选取错误提示元素
    findError() {
        let sel = `#${this.ele.name}-input-error`
        this.eleError =  e(sel)
    }
}