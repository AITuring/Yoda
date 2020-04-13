<div  align="center">    
    <img src="http://lishengyu.xyz/yoda.png" width ="50%"  align="center"/>
</div>

<center><h1><font color="rgb(167, 200, 34)">Yoda</font></h1></center>


yoda是一个为了学习Vue原理，按照Vue语法制作的简易的MVVM框架。

![](https://fontmeme.com/permalink/200413/e908ed3e184539c90070d0ff2abb12d8.png)



## MVVM原理

MVVM是Model-View—ViewModel的简称。

- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁

在MVVM的架构下，View层和Model层并没有直接联系，而是通过ViewModel层进行交互。 ViewModel层通过双向数据绑定将View层和Model层连接了起来，使得View层和Model层的同步工作完全是自动的。
因此开发者只需关注业务逻辑，无需手动操作DOM。

如图：

![](http://lishengyu.xyz/mvvm.png)

