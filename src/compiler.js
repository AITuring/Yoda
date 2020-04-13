import Watcher from "./watcher";
// 模板编译
export default class Compiler{
    constructor(context){
        // console.log(context)
        this.$el = context.$el;
        this.context = context;
        if(this.$el){
            // 原始DOM就是vue语法，要转为正常的html DOM
            // 原始DOM转换为文档片段
            this.$fragment = this.nodeToFragment(this.$el);
            console.log(this.$fragment);
            // 编译模板
            this.compiler(this.$fragment);
            // 把文档片段添加到页面
            this.$el.appendChild(this.$fragment)
        }

    }

    /**
     * 把所有元素转为文档片段
     * @param {*} node 
     */
    nodeToFragment(node) {
        // console.log("nodeToFragment",node);
        let fragment = document.createDocumentFragment();
        // node.childNodes是一个数组
        // console.log(node.childNodes)
        if (node.childNodes && node.childNodes.length){
            node.childNodes.forEach(child => {
                // 判断是否需要添加的节点，如果是注释节点或者是不用的换行，就不用添加
                if(!this.ignorable(child)){
                    
                    fragment.appendChild(child);
                }
            });

        }
        return fragment;

    }

    /**
     * 忽略哪些节点不添加到文档中
     * @param {*} node 
     */
    ignorable(node){
        // 匹配回车换行
        var reg = /^[\t\n\r]+/;
        // nodeType为8为注释；3是文本，需要匹配正则
        return (
            node.nodeType === 8 || (node.nodeType ===3 && reg.test(node.textContent))
        );

    }
    /**
     * 模板编译
     * 递归函数，直到没有子节点时候停止。
     * @param {*} node 
     */
    compiler(node) {
        if (node.childNodes && node.childNodes){
            node.childNodes.forEach(child => {
                // console.log(child);
                // 判断节点类型，如果是元素，节点还有可能包括新的节点，需要找出来，如果是文本就不需要了
                if (child.nodeType ===1){
                    // 元素节点
                    this.compilerElement(child);
                }else if (child.nodeType ===3){
                    // 文本节点
                    this.compilerText(child);
                }
            })
        }

    }
    /**
     * 编译元素节点
     * @param {*} node 
     */
    compilerElement(node){
        let attrs = [...node.attributes];
        attrs.forEach(attr => {
            let {name:attrName, value:attrValue} = attr;
            if (attrName.indexOf("v-") === 0){
                let dirName = attrName.slice(2);
                switch(dirName){
                    case "text":
                        new Watcher(attrValue, this.context, newValue =>{
                            node.textContent = newValue;
                        });
                        break;
                    case "model":
                        new Watcher(attrValue,this.context, newValue =>{
                            node.value = newValue;
                        });
                        break;
                }
            }
        })
        this.compiler(node);

    }
    /**
     * 编译文本节点
     * @param {*} node 
     */
    compilerText(node){
        let text = node.textContent.trim();
        if (text){
            // 把text字符串转化为表达式
            let exp = this.parseTextExp(text);
            // console.log(exp);

            // 添加订阅者，计算表达式值
            // 表达式依赖数据变化时：1.重新计算表达式值 2. node.textContent给最新的值
            // 就完成了Model到View的响应式
            new Watcher(exp,this.context,newValue => {
                node.textContent = newValue;
            });
        }

    }

    /**
     * 文本到表达式的转换
     * @param {*} text 
     */
    parseTextExp(text){
        // 匹配插值表达式正则
        let regText = /\{\{(.+?)\}\}/g;

        // 分割插值表达式前后内容
        let pices = text.split(regText);
        // 匹配插值表达式
        let matches = text.match(regText);
        // 表达式数组
        let tokens = [];
        pices.forEach(item => {
            if (matches && matches.indexOf("{{"+item+"}}") > -1) {
                tokens.push("("+item+")");
            }else{
                tokens.push("`"+item+"`");
            }
        });
        return tokens.join("+");
        

    }
}