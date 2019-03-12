<template>
  <div class="approval">
    <v-layout column fill-height>
      <v-flex shrink class="primary">
        <v-layout align-center justify-space-between row fill-height>
          <v-flex shrink>
            <v-btn @click="$router.back()" icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-flex>

          <v-flex shrink>
            <span class="title">点赞</span>
          </v-flex>

          <v-flex shrink>
            <v-btn dark disabled icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex grow>
        <v-layout row>
          <v-flex xs12>
            <v-card flat>
              <v-list two-line>
                <template v-for="(item, index) in messages">
                  <v-subheader
                      v-if="item.header"
                      :key="index"
                  >
                    {{ item.header }}
                  </v-subheader>

                  <v-divider
                      v-else-if="item.divider"
                      :key="index"
                      :inset="item.inset"
                  ></v-divider>

                  <v-list-tile
                      v-else
                      :key="index"
                      avatar
                  >
                    <v-list-tile-avatar>
                      <v-icon>thumb_up</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
      name: 'Approval',
      data() {
          return {
              messages: [
                  // {
                  //     title: 'Brunch this weekend?',
                  //     subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                  // },
                  // { divider: true, inset: true },
                  // {
                  //     title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                  //     subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                  // },
                  // { divider: true, inset: true },
                  // {
                  //     title: '这算眼袋吗？？',
                  //     subtitle: "<span class='text--primary'>海王星</span> &mdash; 赞同了你的评论"
                  // },
                  // { divider: true, inset: true },
              ]
          }
      },
      methods: {
          initMessage() {
              this.$api.message.get_agree_list().then(res => {
                  if (res.data.code === 1) {
                      this.messages = [];
                      let data = res.data.data;
                      if (data.length < 50) {
                          data.forEach(item => {
                              if (item.type === 1 || item.type === 3) {
                                  this.messages.unshift({
                                      divider: true,
                                      inset: true
                                  });  // 插入分割线
                                  this.messages.unshift(
                                      {
                                          id: item.type === 1? item.answerID: item.commentID,
                                          userId: item.userID,
                                          title: item.title,
                                          subtitle: "<span class='text--primary'>" + item.nickname + "</span> &mdash; 赞同了你的" + (item.type == 1? "回答": "评论"),
                                          time: item.time,
                                      }
                                  );
                              }
                          })
                      } else {
                          for (let i = 0; i < 50; i++) {
                              let item = data[i];
                              if (item.type === 1 || item.type === 3) {
                                  this.messages.unshift({
                                      divider: true,
                                      inset: true
                                  });  // 插入分割线
                                  this.messages.unshift(
                                      {
                                          id: item.type === 1? item.answerID: item.commentID,
                                          userId: item.userID,
                                          title: item.title,
                                          subtitle: "<span class='text--primary'>" + item.nickname + "</span> &mdash; 赞同了你的" + (item.type == 1? "回答": "评论"),
                                          time: item.time,
                                      }
                                  );
                              }
                          }
                      }

                  }
              })
          },  // 初始化消息
      },
      mounted() {
          this.initMessage();
      },
  }
</script>

<style scoped>
  .approval {
    height: 100vh;
    width: 100vw;
    font-family: Helvetica, Arial, sans-serif;
  }
</style>