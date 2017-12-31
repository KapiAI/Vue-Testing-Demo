const profileData = [
  {
    num: 181,
    text: '关注'
  },
  {
    num: 2483,
    text: '粉丝'
  },
   {
    num: 0,
    text: '微博'
  }
];
const weiboNews = [
  {
    imgUrl: '../../static/image/news-profile.02.jpg',
    name: '人民网',
    resource: '6分钟前 来自 人民网微博',
    content: '【18岁，你好！最后一批90后即将全部成年】近日，网友纷纷晒出自己的18岁照片。2017年12月31日，最后一批90后将度过他们的18岁生日，这意味着90后一代已全部成年。还记得你的18岁吗？愿你出走半生，归来仍是少年！',
    images: [
      "../../static/image/news-image.01.png"
    ],
    attention: true,
    collect: false,
    like: false
  },
  {
    imgUrl: '../../static/image/news-profile.01.jpg',
    name: '全球顶尖摄影',
    resource: '6分钟前 来自 网页版微博',
    content: '镜头下最美的劳动者! 他们的工作环境虽然很糟糕，但也是最应该被尊重的人群。 ',
    images: [
      "../../static/image/labor.01.jpg",
      "../../static/image/labor.02.jpg",
      "../../static/image/labor.03.jpg"
    ],
    attention: false,
    collect: false,
    like: false
  },
];
const collectNum = 5;
const likeNum = 22;
export {profileData, weiboNews, collectNum, likeNum}