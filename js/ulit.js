const log = console.log.bind(console)

// 选择元素
const e = function(selector) {
    return document.querySelector(selector)
}

// 批量选择元素
const eAll = function(selector) {
    return document.querySelectorAll(selector)
}

// 绑定事件
const bindEvent = function(element, method, callback) {
    element.addEventListener(method, callback)
}

// 开关 class
const toggleClass = function(element, className) {
    if(element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

// 隐藏元素（提前写好 class）
const hide = function(element) {
    element.classList.add('hide')
}

// 显示元素（提前写好 class）
const show = function(element) {
    element.classList.remove('hide')
}

// 自动触发事件
const trigger = function(element, method) {
    let myEvent = new Event(method);
    element.dispatchEvent(myEvent);
}