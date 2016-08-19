/**
 * Created by fangxianzheng on 2016/8/19.
 */
;(function(win){

    var regItem = {
        // 是否为必填
        required: function(field) {
            var value = field.value;

            //判断是不是单选框，多选框的可能
            if(field.type === 'checkbox' || field.type === 'radio'){
                return field.checked === true;
            }
            return value !== null && value !== '';
        },
        maxLength: function(field, length){
            var value = field.value;
            return value.length <= length;
        },
        minLength: function(field, length){
            var value = field.value;
            return value.length >= length;
        }

    };

    var Mvalidate = function(form){
        this.form = document.forms[form];
        this.options = [];
        this.valid()
    }

    Mvalidate.prototype = {
        add: function(opts){
            
            var self = this;
            self.options.push(opts)

            return this;
        },
        valid: function(){
            var self = this, i = 0, len = self.options.length;
            for(; i < len; i++){
                if(validate.call(self, self.options[i]) === false){
                    return;
                }
            }
        }

    }
    
    win.Mvalidate = Mvalidate;

    /*******私有方法**************************************/

    function validate(opts){
        var el = this.form[opts.name], i = 0;

        if(opts.rules){
            for(; i < opts.rules.length; i++){
                var valiReg = true, valiStr = true;
                if(typeof opts.rules[i] != 'string'){
                    valiReg = validateReg(el, opts.rules[i])
                }else{
                    valiStr = validateString(el, opts.rules[i])
                }

                if(!valiReg || !valiStr){
                    //console.log(opts.name)
                    //console.log(opts.message[i])
                    alertMessage(opts.message[i])
                    return false;
                }
            }
        }else if(opts.sameTo){
            var selfValue = el.value;
            var targetValue = this.form[opts.sameTo].value;
            if(selfValue !== targetValue){
                console.log(opts.message[i])
                return false;
            }
        }
    }

    function alertMessage(message){
        var errorEle = document.createElement('div');
        errorEle.className = 'errorMessage';
        var nodeEles = document.getElementsByClassName('errorMessage');

        if(nodeEles.length === 0){
            document.getElementsByTagName('body')[0].appendChild(errorEle);
        }
        var errEl = document.getElementsByClassName('errorMessage')[0]
        errEl.innerHTML = message;
        errorMessageStyle(errEl)
    }

    function errorMessageStyle(errEl){

        var cssStyle = document.createElement('style');
        cssStyle.type = 'text/css';
        cssStyle.innerHTML = '.errorMessage{background-color:rgba(0,0,0,0.7); color:#fff; font-size:16px; width:60%; position:fixed;margin:auto;top:50%;right:0;left:0; transform: translateY(-50%); -ms-transform: translateY(-50%); -webkit-border-radius:4px;text-align:center;padding:5%;display:block} .animated {-webkit-animation-duration: 1s;animation-duration: 1s;-webkit-animation-fill-mode: both;animation-fill-mode: both;} @-webkit-keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } } @keyframes fadeOut { from { opacity: 1; } to {opacity: 0; } } .fadeOut { -webkit-animation-name: fadeOut; animation-name: fadeOut; }';
        document.head.appendChild(cssStyle)

        errEl.className += ' fadeOut'
    }

    function validateReg(el, rule){
        return rule.test(el.value)
    }

    function validateString(el, rule){

        var result;
        var ruleArr = /(\w+)/ig.exec(rule);

        //不带参数的规则处理
        if(ruleArr[1] === ruleArr.input){
            result = regItem[ruleArr.input](el);

        }else{
            //带参数的规则处理，如：maxLength
            ruleArr = /(\w+)\((\d+)/ig.exec(rule);
            result = regItem[ruleArr[1]](el, ruleArr[2]);
        }
        return result
    }

    function removeClass(ele, oldClass){
        var classNames = ele.className.trim();
        classNames = classNames.replace(/\s+/g,' ');
        var classNameArr = classNames.split(' ');
        for(var j = 0; j<classNameArr.length; j++){
            if(oldClass === classNameArr[j]){
                classNameArr.splice(j,1)
            }
        }
        return ele.className = classNameArr.join(' ');
    }


}(window, undefined));