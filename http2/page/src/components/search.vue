<template>
  <div id="search">
    <Input id="input" suffix="ios-search" size="large" placeholder="search" clearable @keyup.enter.native="searchAsync" autocomplete="on" />
    <div id="result">
      <List item-layout="vertical">
        <ListItem v-for="(item, index) in presentItems" :key="index" style="width: 100%">
            <ListItemMeta :title="item.title" :description="item.content" />
            <template slot="action">
                <li v-if="item.rate">
                  <Icon type="ios-star-outline" /><span class="overflowHidden">{{item.rate}}</span>
                </li>
                <li v-if="item.date">
                  <Icon type="ios-calendar-outline" /><span class="overflowHidden">{{item.date}}</span> 
                </li>
                <li>
                  <Icon type="ios-link-outline" /><a :href="item.link" target="_blank" class="overflowHidden">{{item.link}}</a>
                </li>
            </template>
            <template slot="extra">
              <img :src="item.image" style="width: 280px">
            </template>
        </ListItem>
      </List>
      <Page class="pageFixed"
        :total="result.length" show-sizer show-elevator 
        @on-change="page => {this.page=page}"
        @on-page-size-change="pageSize => {this.pageSize = pageSize}"
      />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Client from '../graphql';

export default {
  name: 'Search',
  data(){
    return {
      presentItems: [],
      page: 1,
      pageSize: 10,
      result: [],
    }
  },
  computed: {
    listImpactFactor () {
      const { result, page, pageSize } = this
      return { result, page, pageSize };
    }
  },
  methods: {
    searchAsync(e) {
      const msg = this.$Message.loading({
        content: 'Searching...',
        duration: 0
      });
      const query = gql`
        query search {
          search(query: "${e.target.value}"){
            res{
              content
              link
              title
              data
              image
              rate
            }
            status
            message
          }
        }
      `

      return Client.query({query})
        .then(res => {
          if(res.data.search.status){
            this.$Message.success({
              background: true,
              content: res.data.search.message
            });
            this.result = res.data.search.res
            this.$Notice.success({
              title: 'Searching result',
              desc: `${this.result.length} results found`
            });
          }
          else{
            this.$Message.error({
              background: true,
              content: res.data.search.message
            })
          }
        })
        .catch(err => {
          this.$Message.error({
            background: true,
            content: err
          });
          this.result = [{
            content: '我有一个应用程序连接到需要基本身份验证的站点.这些站点在运行时提供,在编译时不知道.我正在使用HttpClient 4.2.我不确定下面的代码是否应该如何指定基本身份验证,但文档会建议它.但是,我不知道在AuthScope的构造函数中传递什么.我原以为null参数意味着所提供的凭据应该用于所有link,但它会抛出',
            link: 'https://codeday.me/bug/20190308/712366.html',
            title: 'java – HttpClient 4.2,基本身份验证和AuthScope - 代码日志',
            date: '2019-3-8',
          }, {
            content: '我正在构建一个使用Caspio API。我在使用他们的API进行身份验证时遇到了一些困难。我已经花了2-3天的时间试图解决这个问题，但这可能是由于我的一些理解。我读过无数关于堆叠溢出帖子的文章，但是没有解决这个问题。下面是我的解决方案的代码示例，它是基于我看过的内容，并且我得到',
            link: 'https://cloud.tencent.com/developer/ask/169571',
            title: '如何使用JavaScript的基本身份验证？ - 问答 - 云+社区 - 腾讯云',
            date: '2018-8-14',
            image: 'https://tse1-mm.cn.bing.net/th/id/OET.e144daeb23a44cf7b24f653ce32cd6ad?w=272&h=135&c=7&rs=1&o=5&pid=1.9',
            rate: 3.5
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
            rate: 3.5,
            image: 'https://tse1-mm.cn.bing.net/th/id/OET.366b43867c634c7c8689522b43a32e13?w=272&h=135&c=7&rs=1&o=5&pid=1.9',
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
            rate: 3.5,
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
            rate: 3.5,
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
            rate: 3.5,
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
            rate: 3.5,
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
          }, {
            content: '内容来源于 Stack Overflow，并遵循CC BY-SA 3.0许可协议进行翻译 与使用 回答 (2)关注 (0)查看 (57) 我有以下代码来进行无需身份验证的http调用，一切正常',
            link: 'https://cloud.tencent.com/developer/ask/140258',
            title: '具有基本身份验证的Range5GET/POST http的问题 - 问答 - 云',
            date: '2018-7-9',
          }]
        })
        .finally(() => {
          // remove loading.
          msg();
        })
    },
  },
  watch: {
    listImpactFactor: function(factors) {
      const { result, page, pageSize } = factors;
      this.presentItems = result.slice(pageSize * (page - 1), pageSize * page)
    }
  }
}
</script>

<style scoped>
  #search{
    position: relative;
    min-height: inherit;
    text-align: left;
    background: #fff;
  }
  #input{
    width: 400px;
    margin: 20px;
  }
  #result{
    border-top: solid 1px #dcdee2;
    padding: 20px;
    padding-bottom: 60px;
  }
  #result li{
    display: inline-flex;
    align-items: center;
  }
  .pageFixed{
    position: absolute;
    left: 50%;
    bottom: 20px;
    margin-top: 20px;
    transform: translateX(-50%);
  }
</style>
