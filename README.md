<div  align="center">    
    <img src="http://lishengyu.xyz/yoda.png" width ="40%"  align="center"/>
</div>

![](https://img.shields.io/badge/language-javascript-yellow.svg)   [![codebeat badge](https://codebeat.co/badges/455e8bf3-684d-4c8b-8041-cb5aa6ad75b1)](https://codebeat.co/projects/github-com-aituring-yoda-master) ![](https://img.shields.io/badge/license-MIT-000000.svg)




<center><h1><font color="rgb(167, 200, 34)">Yoda</font></h1></center>




yoda是一个为了学习Vue原理，按照Vue语法制作的简易的MVVM框架。

![](https://fontmeme.com/permalink/200413/e908ed3e184539c90070d0ff2abb12d8.png)



## 🌏MVVM原理

### 什么是MVVM

MVVM是Model-View—ViewModel的简称。

- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁

在MVVM的架构下，View层和Model层并没有直接联系，而是通过ViewModel层进行交互。 ViewModel层通过双向数据绑定将View层和Model层连接了起来，使得View层和Model层的同步工作完全是自动的。
因此开发者只需关注业务逻辑，无需手动操作DOM。

如图：

![](http://lishengyu.xyz/mvvm.png)

### Vue与jQuery

Vue就是一个典型的MVVM框架。Vue就相当于MVVM中的ViewModel层。

在Vue之前，我们一般用jQuery操作DOM元素。下面是一个添加button并绑定click事件的例子：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript" src="js/jquery-1.11.0.js"></script>
		<script type="text/javascript">
			  $(function(){
			  	   $("#a").click(function(){			  	   			 
			  	    alert("click");
			  	   });			  			 		  				  	
			  });
			 
		</script>
	</head>
	<body>
		<input type="button" value="abutton" id="a" />
    </body>
   </html> 
```
可以看到，HTML和javascript代码耦合在了一起。如果直接作DOM元素，会造成性能低下等一系列问题。

如果使用Vue的话，可以将视图层和模型层有效地分离开来，代码如下：

```vue
<template>
   <div>
     <button @click="handeClick()">点我</button>
   </div>
</template>
<script>
export default {
   name:'App',
   methods:{
     handleClick:function(){
       console.log('click');
     }
   },
}
</script>
```
可以看到，在Vue中，负责视图的 HTML 代码和负责业务逻辑的 JS 代码有效地分离开来。之所以能做到这一点，这就要依靠MVVM中的VM(ViewModel)实现。ViewModel层通过双向数据绑定将View层和Model层连接了起来，使得View层和Model层的同步工作完全是自动的。


