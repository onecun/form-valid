// 提交时检查
const checkForm = function (inputList, inputs) {
    let btn = e('#submit')
    bindEvent(btn, 'click', function (event) {
        for (let i = 0; i < inputs.length; i++) {
            for (let i = 0; i < inputList.length; i++) {
                let input = inputList[i]
                trigger(input, 'blur')
            }
            // 
            let inputErrorList = eAll('.input-error')
            for (let i = 0; i < inputErrorList.length; i++) {
                let error = inputErrorList[i]
                if(!error.classList.contains('hide')) {
                    alert('invalid')
                    return
                }
            }
        }
        alert('注册成功')
    })
}

const __main = function() {
    // 1. 选中页面中所有的 input[data-rule]
    let inputList = eAll('.input-control')

    let inputs = []
    // 2. 解析每一个 input 验证规则
    for (let i = 0; i < inputList.length; i++) {
        let tmp = new Input(inputList[i])
        inputs.push(tmp)
    }
    // 3. 开始验证 
    // input 自动验证

    checkForm(inputList, inputs)
}

__main()