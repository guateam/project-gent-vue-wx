<template>
  <div class="reply">
    <v-layout column fill-height>
      <v-flex shrink class="primary">
        <v-layout align-center justify-space-between row fill-height>
          <v-flex shrink>
            <v-btn @click="$router.back()" icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-flex>

          <v-flex shrink>
            <span class="title">评论和回复</span>
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
            <v-tabs fixed-tabs>
              <v-tab
                  v-for="tab in ['回答', '文章', '问题']"
                  :key="tab"
              >
                {{ tab }}

              </v-tab>
              <v-tab-item :key="'回答'">
                <v-card flat>
                  <v-list two-line>
                    <template v-for="(item, index) in answer">
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
                          <v-icon>settings</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-tab-item>

              <v-tab-item :key="'文章'">
                <v-card flat>
                  <v-list two-line>
                    <template v-for="(item, index) in article">
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
                          <v-icon>person</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-tab-item>

              <v-tab-item :key="'问题'">
                <v-card flat>
                  <v-list two-line>
                    <template v-for="(item, index) in question">
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
                          <v-icon>question</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                          <v-list-tile-title v-html="item.title"></v-list-tile-title>
                          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
    export default {
        name: 'Reply',
        data() {
            return {
                answer: [],
                article: [],
                question: [],
            }
        },
        methods: {
            initMessage() {
                this.$api.message.get_comment_and_reply().then(res => {
                    if (res.data.code === 1) {
                        this.answer = [];
                        this.article = [];
                        this.question = [];
                        let answer = res.data.data.answer;
                        answer.forEach(item => {
                            this.answer.unshift({
                                divider: true,
                                inset: true
                            });  // 插入分割线
                            this.answer.unshift(
                                {
                                    id: item.noticeID,
                                    userId: item.userID,
                                    target: item.target,
                                    title: item.name,
                                    subtitle: item.content,
                                    time: item.createtime,
                                }
                            );
                        });

                        let article = res.data.data.article;
                        article.forEach(item => {
                            this.article.unshift({
                                divider: true,
                                inset: true
                            });  // 插入分割线
                            this.article.unshift(
                                {
                                    id: item.noticeID,
                                    userId: item.userID,
                                    target: item.target,
                                    title: item.name,
                                    subtitle: item.content,
                                    time: item.createtime,
                                }
                            );
                        });

                        let question = res.data.data.question;
                        question.forEach(item => {
                            this.question.unshift({
                                divider: true,
                                inset: true
                            });  // 插入分割线
                            this.question.unshift(
                                {
                                    id: item.noticeID,
                                    userId: item.userID,
                                    target: item.target,
                                    title: item.name,
                                    subtitle: item.content,
                                    time: item.createtime,
                                }
                            );
                        });

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
  .reply {
    height: 100vh;
    width: 100vw;
    font-family: Helvetica, Arial, sans-serif;
  }
</style>