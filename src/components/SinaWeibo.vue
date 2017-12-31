<template>
  <div class="weibo-page">
    <nav>
      <span class="weibo-logo"></span>
      <div class="search-wrapper">
        <input type="text" placeholder="大家正在搜: 李棠辉的文章好赞!">
        <img v-if="!iconActive" @mouseover="mouseOverToIcon" src="../../static/image/search.png" alt="搜索icon">
        <img v-if="iconActive" @mouseout="mouseOutToIcon" src="../../static/image/search-active.png" alt="搜索icon">
      </div>
    </nav>
    <div class="main-container">
      <aside class="aside-nav">
        <ul>
          <li :class="{ active: isActives[indexOfContent] }" v-for="(content, indexOfContent) in asideTab" :key="indexOfContent" @click="tabChange(indexOfContent)">
            <span>{{content}}</span>
            <span class="count">
              <span v-if="indexOfContent === 1" class="collect-num">
              (
                <span>{{collectNum}}</span>
              )
              </span>
              <span v-if="indexOfContent === 2" class="like-num">
              (
                <span>{{likeNum}}</span>
              )
              </span>              
            </span>
          </li>
        </ul>
      </aside>
      <main class="weibo-content">
        <div class="weibo-publish-wrapper">
          <img src="../../static/image/tell-people.png"></img>
          <textarea v-model="newWeiboContent.content"></textarea>
          <button @click="publishNewWeiboContent">发布</button>
        </div>
        <div 
          class="weibo-news" 
          v-for="(news, indexOfNews) in weiboNews"
          :key="indexOfNews">
          <div class="content-wrapper">
            <div class="news-title">
            <div class="news-title__left">
              <img :src="news.imgUrl">
              <div class="title-text">
                <div class="title-name">{{news.name}}</div>
                <div class="title-time">{{news.resource}}</div>
              </div>
            </div>
            <button 
              class="news-title__right add" 
              v-if="news.attention === false"
              @click="attention(indexOfNews)">
              <i class="fa fa-plus"></i>
              关注
            </button>
             <button 
              class="news-title__right cancel" 
              v-if="news.attention === true"
              @click="unAttention(indexOfNews)">
              <i class="fa fa-close"></i>
              取消关注
            </button>
          </div>
          <div class="news-content">{{news.content}}</div>
          <div class="news-image" v-if="news.images.length">
            <img 
            v-for="(img, indexOfImg) in news.images"
            :key="indexOfImg"
            :src="img">
          </div>
          </div>
          <ul class="news-panel">
            <li 
              :class="{uncollectedWeibo: !news.collect, collectedWeibo: news.collect}"
              @click="handleCollect(indexOfNews)">
              <i class="fa fa-star-o" :class="{collected: news.collect }"></i>
              {{news.collect ? "已收藏" : '收藏'}}
            </li>
            <li>
              <i class="fa fa-external-link"></i>
              转发
            </li>
            <li>
              <i class="fa fa-commenting-o"></i>
              评论
            </li>
            <li 
              :class="{dislikedWeibo: !news.like, likedWeibo: news.like}"
              @click="handleLike(indexOfNews)">
              <i class="fa fa-thumbs-o-up" :class="{liked: news.like}"></i>
              {{news.like ? '取消赞' : '赞'}}
            </li>
          </ul>
        </div>

      </main>
      <aside class="aside-right">
        <div class="profile-wrapper">
          <div class="profile-top">
            <img src="../../static/image/profile.jpg">
          </div>
          <div class="profile-bottom">
            <div class="profile-name">Lee_tanghui</div>
            <ul class="profile-info">
              <li 
                v-for="(profile, indexOfProfile) in profileData"
                :key="indexOfProfile">
                <div class="number">{{profile.num}}</div>
                <div class="text">{{profile.text}}</div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
    <footer>
       Wish you like my blog! --- LITANGHUI
    </footer>
  </div>
</template>

<script>
  //引入假数据
  import * as mockData from '../mock-data.js'

  export default {
    created() {
      //模拟获取数据
      this.profileData = mockData.profileData;
      this.weiboNews = mockData.weiboNews;
      this.collectNum = mockData.collectNum;
      this.likeNum = mockData.likeNum;

    },
    data() {
      return {
        iconActive: false,
        asideTab: ["首页", "我的收藏", "我的赞"],
        isActives: [true, false, false],
        profileData: [],
        weiboNews: [],
        collectNum: 0,
        likeNum: 0,
        newWeiboContent:   {
          imgUrl: '../../static/image/profile.jpg',
          name: 'Lee_tanghui',
          resource: '刚刚 来自 网页版微博',
          content: '',
          images: []
        },
      }
    },
    methods: {
      mouseOverToIcon() {
        this.iconActive = true;
      },
      mouseOutToIcon() {
        this.iconActive = false;
      },
      tabChange(indexOfContent) {
        this.isActives.forEach((item, index) => {
          index === indexOfContent ?
            this.$set(this.isActives, index, true) :
            this.$set(this.isActives, index, false);
        })
      },
      publishNewWeiboContent() {
        if(!this.newWeiboContent.content) {
          alert('请输入内容!')
          return;
        }
        const newWeibo = JSON.parse(JSON.stringify(this.newWeiboContent));
        this.weiboNews.unshift(newWeibo);
        this.newWeiboContent.content = '';
        this.profileData[2].num++;
      },
      attention(index) {
        this.weiboNews[index].attention = true;    
        this.profileData[0].num++;    
      },
      unAttention(index) {
        this.weiboNews[index].attention = false;
        this.profileData[0].num--;
      },
      handleCollect(index) {
        this.weiboNews[index].collect = !this.weiboNews[index].collect;
        this.weiboNews[index].collect ? 
        this.collectNum++ :
        this.collectNum--;
      },
      handleLike(index) {
        this.weiboNews[index].like = !this.weiboNews[index].like;
        this.weiboNews[index].like ? 
        this.likeNum++ :
        this.likeNum--;
      }
    }
  }
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .weibo-page {
    display: flex;
    flex-direction: column;
  }

  nav {
    display: flex;
    height: 60px;
    line-height: 60px;
    background-color: #f0f0f0;
    align-items: center;
    .weibo-logo {
      margin-left: 13%;
      width: 100px;
      height: 28px;
      background: url("../../static/image/WB_logo.png") no-repeat;
      cursor: pointer;
    }
    .search-wrapper {
      display: flex;
      position: relative;
      width: 25%;
      input {
        width: 100%;
        height: 24px;
        padding-left: 10px;
      }
      img {
        position: absolute;
        right: 10px;
        top: 4px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

  }

  .main-container {
    display: flex;
    justify-content: center;
    background-color: #000;
    padding-top: 16px;
    color: #fff;
    .aside-nav {
      width: 11.31%;
      ul {
        list-style: none;
        li {
          height: 34px;
          line-height: 34px;
          padding-left: 10px;
          cursor: pointer;
          font-weight: bold;
          background-color: rgb(19, 19, 19);
        }
        li:hover {
          background-color: rgb(66, 66, 66);
        }
        .active {
          background-color: rgb(66, 66, 66);
        }
      }
    }
    .weibo-content {
      width: 45.41%;
      color: #000;
      .weibo-publish-wrapper {
        background: #fff;
        position: relative;
        padding: 10px 10px 54px 10px;
        textarea {
          display: block;
          width: 100%;
          height: 95px;
          padding: 10px;
        }
        button {
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 82px;
          height: 30px;
          background: #ff8140;
          border: 1px solid #f77c3d;
          color: #fff;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }
      }
      .weibo-news {
        background: #fff;
        margin: 10px 0;
        .content-wrapper {
          padding: 20px 20px 4px 20px;
        }
        .news-title {
          display: flex;
          justify-content: space-between;
          .news-title__left {
            display: flex;
            img {
              width: 50px;
              height: 50px;
              vertical-align: text-top;
            }
            .title-text {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 10px;
            }
            .title-name {
              color: #333;
              font-size: 14px;
              font-weight: 700;
            }
            .title-time {
              color: #808080;
              margin-bottom: 2px;
              font-size: 12px;
            }
          }
          .news-title__right {
            align-self: center;
            width: 58px;
            height: 22px;
            line-height: 22px;
            background: #fff;
            border: 1px solid #d9d9d9;
            cursor: pointer;
            img {
              position: relative;
              left: 1px;
              top: 2px;
            }
            i {
              color: #ff8140;
            }
          }
          .cancel {
            width: 86px;
          }
        }
        .news-content {
          padding: 10px 0 10px 60px;
          font-size: 14px;
        }
        .news-image {
          padding: 10px 0 0 60px;
          img {
            width: 110px;
            height: 110px;
            margin-right: 10px;
          }
        }
        .news-panel {
          display: flex;
          list-style: none;
          border-top: 1px solid #f2f2f5;
          li {
            width: 25%;
            height: 22px;
            line-height: 22px;
            margin: 7px 0;
            text-align: center;
            border-left: 1px solid #f2f2f5;
            color: #808080;
            cursor: pointer;
            .collected {
              color: #ff8140;
            }
            .like {
              color: #ff8140;
            }
          }
        }
      }
    }
    .aside-right {
      width: 17.41%;
      margin-left: 10px;
      .profile-top {
        position: relative;
        height: 75px;
        background: url('../../static/image/profile-bg.jpg');
        img {
          position: absolute;
          bottom: -30px;;
          left: 50%;
          margin-left: -30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      .profile-bottom {
        height: 118px;
        padding-top: 30px;
        background: #fff;
        color: #000;
        .profile-name {
          text-align: center;
          font-weight: 700;
        }
        .profile-info {
          display: flex;
          list-style: none;
          padding-top: 10px;
          li {
            width: 33.333%;
            border-left: 1px solid #f2f2f5;
            cursor: pointer;
            div {
              text-align: center;
            }
            .number{
              font-weight: 700;
            }
          }
        }
      }
    }
  }

  footer {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 12px;
    font-weight:700;
  }
</style>