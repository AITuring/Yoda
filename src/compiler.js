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
     * @param {*} node 
     */
    compiler(node) {
        if (node.childNodes && node.childNodes){
            node.childNodes.forEach(child => {
                console.log(child);
            })
        }

    }
}