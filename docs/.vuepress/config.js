module.exports = {
    title: 'Yoda', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '一个MVVM框架',// meta 中的描述文字，用于SEO
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./fav.ico` }]
     ],
    themeConfig: {
        logo: '/jedi.jpg',
        repo: 'https://github.com/AITuring/Yoda',
        repoLabel: 'Github',
        editLinks: true,
        editLinkText: '编辑此页',
        nav:[
            {text:'MVVM原理', link: '/pages/MVVM.md'},
            {text:'Yoda的实现', link: '/pages/yoda.md'}
        ],
        sidebar:'auto',
    }
    
    
}