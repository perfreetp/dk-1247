export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/ask/index',
    'pages/knowledge/index',
    'pages/profile/index',
    'pages/answer/index',
    'pages/emergency/index',
    'pages/pet-profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FF8C42',
    navigationBarTitleText: '宠物问答助手',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#FF8C42',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/ask/index',
        text: '提问'
      },
      {
        pagePath: 'pages/knowledge/index',
        text: '知识库'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})
