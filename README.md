# form-valid
表单验证组件


在 **input[data-rule]** 中填写规则自动验证

``` html
  <input 
      data-rule='maxlength:18|minlength:2|pattern:"^[a-zA-Z0-9]*$"'
      type="text"
      name="username"
      class="input-control">
```
支持的规则：
``` javascript
    rule = {
        max: '最大值',
        min: '最小值',
        maxlength: '最大长度',
        minlength: '最小长度',
        numeric: '只为数字',
        required: '必填项',
        pattern: '匹配特定规则(正则)',
    }
```
## demo展示
![demo](https://github.com/onecun/form-valid/blob/master/demo.gif)
