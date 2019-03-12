<template>
  <div class="call">
    <v-layout column fill-height>
      <v-flex shrink class="primary">
        <v-layout align-center justify-space-between row fill-height>
          <v-flex shrink>
            <v-btn @click="$router.back()" icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-flex>

          <v-flex shrink>
            <span class="title">@我的</span>
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
                      <img :src="item.avatar">
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
        name: 'Call',
        data() {
            return {
                messages: [],
            }
        },
        methods: {
            initMessage() {
                this.$api.message.get_at_list().then(res => {
                    if (res.data.code === 1) {
                        this.messages = [];
                        let data = res.data.data;
                        if (data.length < 50) {
                            data.forEach(item => {
                                this.messages.unshift({
                                    divider: true,
                                    inset: true
                                });  // 插入分割线
                                this.messages.unshift(
                                    {
                                        avatar: item.headportrait,
                                        id: item.id,
                                        userId: item.user_id,
                                        title: item.nickname + " 提到了你了你",
                                        subtitle: item.content,
                                        time: item.time,
                                    }
                                );
                            })
                        } else {
                            for (let i = 0; i < 50; i++) {
                                let item = data[i];
                                this.messages.unshift({
                                    divider: true,
                                    inset: true
                                });  // 插入分割线
                                this.messages.unshift(
                                    {
                                        avatar: item.headportrait,
                                        id: item.id,
                                        userId: item.user_id,
                                        title: item.nickname + " 提到了你了你",
                                        subtitle: item.content,
                                        time: item.time,
                                    }
                                );
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
  .call {
    height: 100vh;
    width: 100vw;
    font-family: Helvetica, Arial, sans-serif;
  }
</style>