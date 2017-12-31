import Vue from 'vue'
import SinaWeibo from '@/components/SinaWeibo'
import { mount } from 'vue-test-utils'
import sino from 'sinon'

describe('SinaWeibo.vue', () => {
  it('点击发布按钮,发布新内容&个人微博数量增加1个', () => {
    const wrapper = mount(SinaWeibo);
    const textArea = wrapper.find('.weibo-publish-wrapper textarea');
    const buttonOfPublish = wrapper.find('.weibo-publish-wrapper button');
    const lengthOfWeiboNews = wrapper.vm.weiboNews.length;
    const countOfMyWeibo = wrapper.vm.profileData[2].num;
    
    //设置textArea的绑定数据
    wrapper.setData({newWeiboContent: {
      imgUrl: '../../static/image/profile.jpg',
      name: 'Lee_tanghui',
      resource: '刚刚 来自 网页版微博',
      content: '欢迎来到我的微博', 
      images: []
    }});
    //触发点击事件
    buttonOfPublish.trigger('click');
    const lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length;
    const countOfMyWeiboAfterPublish = wrapper.vm.profileData[2].num;

    //断言: 发布新内容
    expect(lengthOfWeiboNewsAfterPublish).to.equal(lengthOfWeiboNews + 1);
    //断言: 个人微博数量增加1个
    expect(countOfMyWeiboAfterPublish).to.equal(countOfMyWeibo + 1);
  });

  it('当文本框中无内容时, 不能发布空微博到微博列表, 且弹出提示框', () => {
    const wrapper = mount(SinaWeibo);
    const textArea = wrapper.find('.weibo-publish-wrapper textarea');
    const buttonOfPublish = wrapper.find('.weibo-publish-wrapper button');
    const lengthOfWeiboNews = wrapper.vm.weiboNews.length;
    const countOfMyWeibo = wrapper.vm.profileData[2].num;
    
    //设置textArea的绑定数据为空
    wrapper.setData({newWeiboContent: {
      imgUrl: '../../static/image/profile.jpg',
      name: 'Lee_tanghui',
      resource: '刚刚 来自 网页版微博',
      content: '', 
      images: []
    }});
    //触发点击事件
    buttonOfPublish.trigger('click');
    const lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length;
    const countOfMyWeiboAfterPublish = wrapper.vm.profileData[2].num;

    //断言: 没有发布新内容
    expect(lengthOfWeiboNewsAfterPublish).to.equal(lengthOfWeiboNews);
    //断言: 个人微博数量不变
    expect(countOfMyWeiboAfterPublish).to.equal(countOfMyWeibo);
  });

  it('当点击"关注", 个人头像下关注的数量会增加1个, 且按钮内字体变成"取消关注"', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfAddAttendion = wrapper.find('.add');
    const countOfMyAttention = wrapper.vm.profileData[0].num;
  
    //触发事件
    buttonOfAddAttendion.trigger('click');
    
    const countOfMyAttentionAfterClick = wrapper.vm.profileData[0].num;

    //断言: 个人头像下关注的数量会增加1个
    expect(countOfMyAttentionAfterClick).to.equal(countOfMyAttention + 1);
    //断言: 按钮内字体变成"取消关注
    expect(buttonOfAddAttendion.text()).to.equal('取消关注');
  })

  it('当点击"取消关注", 个人头像下关注的数量会减少1个, 且按钮内字体变成"关注"', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfUnAttendion = wrapper.find('.cancel');
    const countOfMyAttention = wrapper.vm.profileData[0].num;
  
    //触发事件
    buttonOfUnAttendion.trigger('click');
    
    const countOfMyAttentionAfterClick = wrapper.vm.profileData[0].num;

    //断言: 个人头像下关注的数量会增加1个
    expect(countOfMyAttentionAfterClick).to.equal(countOfMyAttention - 1);
    //断言: 按钮内字体变成"取消关注
    expect(buttonOfUnAttendion.text()).to.equal('关注');
  })

  it('当点击"收藏"时, 我的收藏会增加1个数量, 且按钮内文字变成"已收藏"', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfCollect = wrapper.find('.uncollectedWeibo');
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text());

    //触发点击事件
    buttonOfCollect.trigger('click');
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text());

    //断言: 我的收藏数量会加1
    expect(countOfMyCollectAfterClick).to.equal(countOfMyCollect + 1);
    //断言: 按钮内文字变成已收藏
    expect(buttonOfCollect.text()).to.equal('已收藏');
  })

  it('当点击"已收藏"时, 我的收藏会减少1个数量, 且按钮内文字变成"收藏"', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfUnCollect = wrapper.find('.collectedWeibo');
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text());

    //触发点击事件
    buttonOfUnCollect.trigger('click');
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text());

    //断言: 我的收藏数量会减1
    expect(countOfMyCollectAfterClick).to.equal(countOfMyCollect - 1 );
    //断言: 按钮内文字变成已收藏
    expect(buttonOfUnCollect.text()).to.equal('收藏');
  });

  it('当点击"赞", 我的赞会增加1个数量, 且按钮内文字变成"取消赞"', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfLike = wrapper.find('.dislikedWeibo');
    const countOfMyLike = Number(wrapper.find('.like-num span').text());

    //触发点击事件
    buttonOfLike.trigger('click');
    const countOfMyLikeAfterClick = Number(wrapper.find('.like-num span').text());

    //断言: 我的赞会增加1个数量
    expect(countOfMyLikeAfterClick).to.equal(countOfMyLike + 1);
    //断言: 按钮内文字变成取消赞
    expect(buttonOfLike.text()).to.equal('取消赞');
  });

  it('当点击"取消赞", 我的赞会减少1个数量, 且按钮内文字变成"赞"', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfDislike = wrapper.find('.likedWeibo');
    const countOfMyLike = Number(wrapper.find('.like-num span').text());

    //触发点击事件
    buttonOfDislike.trigger('click');
    const countOfMyLikeAfterClick = Number(wrapper.find('.like-num span').text());

    //断言: 我的赞会增加1个数量
    expect(countOfMyLikeAfterClick).to.equal(countOfMyLike - 1);
    //断言: 按钮内文字变成取消赞
    expect(buttonOfDislike.text()).to.equal('赞');
  });
});