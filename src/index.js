import Observer from "./observer";
import Compiler from "./compiler";

class Yoda{
    constructor(options){
        // console.log(options);
        // 获取元素DOM对象
        this.$el = document.querySelector(options.el);
        // console.log(this.$el);
        // 转存数据
        this.$data = options.data || {};

        //数据和函数的代理
        this._proxyData(this.$data)

        // 数据劫持
        new Observer(this.$data);
        // 模板编译
        // 模板和data以及作用域
        new Compiler(this);

    }
    /**
     * 数据的代理
     * @param {*} data 
     */
    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this,key,{
                set(newValue){
                    data[key]= newValue;
                },
                get(){
                    return data[key];
                }
            })
        });
    }
    /**
     * 函数的代理
     * @param {*} methods 
     */
    _proxyMethods(methods){
        if (methods && typeof methods === 'object'){
            Object.keys(method).forEach(key =>{
                this[key]=methods[key];
            });
        }

    }
}

window.Yoda = Yoda;