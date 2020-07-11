const menuList = [
  {
    id: 1,
    title: '轮播图管理',
    class: 'iconfont iconlunbotuguanli',
    children: [
      {
        title: '轮播图列表',
        path: '/banner',
        class: 'iconfont iconlunbotuguanli'
      }
    ]
  },
  {
    id: 2,
    title: '书籍管理',
    class: 'iconfont iconshujiguanli',
    children: [
      {
        title: '书籍列表',
        path: '/list',
        class: 'iconfont iconbiaodanliebiao-'
      },
      {
        title: '书籍分类',
        path: '/cate',
        class: 'iconfont iconfeneli-copy'
      }
    ]
  },
  {
    id: 3,
    title: '留言管理',
    class: 'iconfont iconliuyanguanli',
    children: [
      {
        title: '留言管理',
        path: '/message',
        class: 'iconfont iconliuyanguanli'
      }
    ]
  },
  {
    id: 4,
    title: '数据统计',
    class: 'iconfont iconshujutongji',
    children: [
      {
        title: '折线图',
        path: '/line',
        class: 'iconfont icontiaoxingtu'
      },
      {
        title: '柱状图',
        path: '/columnar',
        class: 'iconfont iconzhuzhuangtu'
      },
      {
        title: '扇形图',
        path: '/pie',
        class: 'iconfont iconshanxingtu'
      }
    ]
  }
]
export default menuList
