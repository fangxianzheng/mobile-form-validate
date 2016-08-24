# mobile-form-validate
mobile-form-validate 移动端表单验证，适合移动端的表单验证(原生JS，无依赖）

## 简介

适合移动端的表单验证插件，无任何依赖


## 截图

![截图1](https://fangxianzheng.github.io/demo/Mvalidate/demo1-screenshot1.png)    ![截图2](https://fangxianzheng.github.io/demo/Mvalidate/demo1-screenshot2.png)

## 示例

![扫一扫](https://fangxianzheng.github.io/demo/Mvalidate/demo1-QR.png)
[表单验证实例](https://fangxianzheng.github.io/demo/Mvalidate/demo1.html)

## 依赖

无依赖

## 使用方法

在页面中引入所需的文件

`<script src="Mvalidate.js"></script>`

````
  var ooo = new Mvalidate('myForm')

    ooo.add({
        name:'user',
        rules:['required',/^[\u2E80-\u9FFF]+$/,'maxLength(4)'],
        message:['用户名必须填写','用户名必须是中文','用户名最长不能超过4位'],
        callback:function(el, errorEl){

        }
    }).add({
        name:'password',
        rules:['required',/\d+/,'minLength(5)'],
        message:['密码必须填','密码必须为数字','密码太短'],
        callback:function(el, errorEl){

        }
    }).add({
        name:'confirm-password',
        sameTo:'password',
        message:['两次密码必须保持一致']
    }).add({
        name:'mobile',
        rules:[/^[1-9]\d{10}$/],
        message:['手机号输入错误']
    }).add({
        name:'email',
        rules:[/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
        message:['对不起，您填写的E-mail格式不正确！']
    }).add({
        name:'sure',
        rules:['required'],
        message:['确定项项必须选']
    })


    document.forms.myForm.submit.addEventListener('click',function(e){
        e.preventDefault();
        console.log(ooo.valid())

        if(ooo.valid()){
            //在这里写Ajax提交
        }
    })
````

## 文档

### 初始化

` var ooo = new Mvalidator(form)` 这样就实例化了一个对象`ooo`，
`form` 为form 的ID或name.

### 暴露的方法

#### `.add(object)` 添加验证项

核心方法，参数`object` 为一个对象，具体属性和方法如下表

|       参数        |   说明   |  默认值 |      可填值     |
|------------------|----------|--------|----------------|
| name              |  需要验证的表单项 | 无 （必填）    | 一个input的name活id值  |
| rules               | 验证的规则    | 无（必填）     | 一个数组，数组内容为'required','maxLength(number)','minLength(number)',或正则     |
| message            | 错误信息 |  无（必填   | 一个数组，数组提示文字对应rules中的规则   |
| callback      | 验证后的回调函数   | function(el, errorEl)） | 代码块，回调函数中的两个参数分别是验证项的元素、错误信息元素 |
| sameTo        | 和哪一项内容相同，一般用于确认密码的input   | 无 | 一个验证项的id或name， 如 sameTo: 'password'，意思是和密码内容相同 |

`callback`方法的使用：

1 改变提示信息的颜色 

```
.add({
  //////其他代码
  callback: function(el, errorEl){
     errorEl.style.backgruondColor = 'red'
  }
  //////其他代码
})
```
2 改变错误信息对应的input的样式

```
.add({
  //////其他代码
  callback: function(el, errorEl){
     el.style.cssText = 'border: 1px solid red'
  }
  //////其他代码
})
```

3 发挥自己想象，想怎么写就怎么写

#### `.remove(inputName)` 移除验证项

移除一个验证项，参数为input的name

#### `.valid()` 判断是否通过验证，返回值值为`true`或`false`

通常在`submit`表单的方法中，判断表单是否通过验证，若通过返回值为`true`，否则为`false`
`.valid()`是必须调用的方法，相当于'开始验证'的意思。



