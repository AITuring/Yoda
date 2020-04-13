import { get } from "https";
import Dep from "./dep";

// 数据劫持
export default class Observer {
    constructor(data) {
        // console.log(data);
        this.data = data;
        // 遍历对象完成所有数据劫持
        this.walk(this.data);

    }
    
    /**
     * 遍历对象
     * @param {*} data 
     * 一个递归函数，直到没有数据或数据类型不对才推出
     */
    walk(data) {
        // 如果没有数据，或者数据类型不是object
        if (!data || typeof data !== 'object'){
            return;
        }
        Object.keys(data).forEach(key => {
            // console.log(key);
            this.defineReactive(data,key,data[key]);

        })
    }
    
    /**
     * 动态设置响应式数据
     * @param {*} data 
     * @param {*} key 
     * @param {*} value 
     */
    defineReactive(data, key, value){
        let dep = new Dep();
        Object.defineProperty(data, key, {
            // 可遍历
            enumerable: true,
            // 不可再配置
            configurable: false,
            get: () => {
                // console.log('get')
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
    
            set: newValue => {
                console.log('set')
                value = newValue;
                // TODO 触发view页面的变化
                dep.notify();
            }
    
        });

        this.walk(value);

        
    }
}