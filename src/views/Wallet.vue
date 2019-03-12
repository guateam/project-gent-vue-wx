<template>
  <div class="wallet">
    <div style="height: 50%">
      <v-layout column fill-height>
        <v-flex shrink>
          <v-layout justify-space-between row>
            <v-flex shrink>
              <v-btn @click="$router.back()" icon>
              <!--<v-btn @click="$router.push($route.query.redirect || {name: 'account'})" icon>-->
                <v-icon>arrow_back</v-icon>
              </v-btn>
            </v-flex>
            <v-flex shrink>
              <v-btn @click="callService" icon>
                <v-icon>headset</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex grow>
          <v-layout justify-space-between column fill-height>
            <v-flex>
              <v-container fill-height>
                <v-layout column fill-height>

                  <!--Balance-->
                  <v-flex xs7>
                    <v-layout align-center justify-center column fill-height>
                      <v-flex shrink>
                        <span class="font--text">总资产(元)</span>
                      </v-flex>
                      <v-flex shrink>
                        <span class="balance font-weight-bold">{{ balance }}</span>
                      </v-flex>
                      <v-flex shrink>
                        <v-layout>
                          <v-flex>
                            <v-btn @click="withdraw" small color="success" flat outline>提现</v-btn>
                          </v-flex>
                          <v-flex>
                            <v-btn @click="topUp" small color="success" flat outline>充值</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <!--Cards-->
                  <v-flex xs5>
                    <v-layout align-center justify-space-between row fill-height>
                      <v-flex xs5 fill-height>
                        <v-card height="100%" color="purple" dark>
                          <v-layout class="card-info" align-start justify-space-between column fill-height>
                            <v-flex shrink>
                              <span>专+学院</span>
                              <h2>年费会员</h2>
                            </v-flex>
                            <v-flex shrink>
                              <span>2020-10-10</span>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                      <v-flex xs5 fill-height>
                        <v-card height="100%" color="blue-grey darken-2" dark>
                          <v-layout class="card-info" align-start justify-space-between column fill-height>
                            <v-flex shrink>
                              <span>专+读书会</span>
                              <h2>季度借阅卡</h2>
                            </v-flex>
                            <v-flex shrink>
                              <span>2019-06-01</span>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                      <v-flex shrink fill-height>
                        <v-card height="100%" color="grey darken-2" dark>
                          <v-layout @click="showMoreCards" class="card-info" align-center justify-center column fill-height>
                            <v-icon>more_vert</v-icon>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>

    <v-layout>
      <!--Details-->
      <v-flex>
        <v-tabs fixed-tabs>
          <v-tab
              v-for="tab in ['消费记录', '充值记录']"
              :key="tab"
          >
            {{ tab }}
          </v-tab>
          <!--支出-->
          <v-tab-item :key="'消费记录'">
            <v-card flat min-height="200">
              <v-list two-line subheader>

                <div v-for="(item, index) in expense" :key="index">
                  <v-divider></v-divider>

                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon class="red lighten-1 white--text">trending_down</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.time }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                          <span class="font-weight-bold">
                            <span class="red--text">- </span>
                            {{ item.price }}
                          </span>
                    </v-list-tile-action>
                  </v-list-tile>
                </div>

              </v-list>
            </v-card>
          </v-tab-item>

          <!--收入-->
          <v-tab-item :key="'充值记录'">
            <v-card flat min-height="200">
              <v-list two-line subheader>

                <div v-for="(item, index) in income" :key="index">
                  <v-divider></v-divider>

                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon class="green lighten-1 white--text">trending_up</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.time }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                          <span class="font-weight-bold">
                            <span class="green--text">+ </span>
                            {{ item.price }}
                          </span>
                    </v-list-tile-action>
                  </v-list-tile>
                </div>

              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "wallet",
    data() {
      return {
        // items: [
        //     {title: '交易记录', name: 'oldpost'},
        //     {title: '积分', name: 'collection'},
        //     {title: '地址管理', name: 'wallet'},
        //     {title: '设置', name: 'settings'},
        //     {title: '客服中心  ', name: 'settings'},
        // ],
        expense: [
          { title: '学院会员', time: '2019-10-10', price: '120.00' },
          { title: '读书会借阅卡', time: '2019-03-01', price: '60.00' },
        ],  // 支出/消费
        income: [
          { title: '支付宝充值', time: '2019-10-10', price: '120.00' },
          { title: '微信充值', time: '2019-03-01', price: '60.00' },
          { title: '微信充值', time: '2019-01-01', price: '2,000.00' },
        ],  // 收入/充值
        balance: "正在载入...",  // 余额
      }
    },
    methods: {

      callService() {
        this.$store.commit('showInfo', '呼叫客服');
      },  // 呼叫客服

      showMoreCards() {
        this.$store.commit('showInfo', '显示更多卡券');
      },  // 显示更多卡券

      withdraw() {
        this.$store.commit('showInfo', '立即提现');
      },  // 提现

      topUp() {
        this.$store.commit('showInfo', '立即充值');
      },  // 充值

      getBalance() {
        this.$api.account.get_account_balance().then((res) => {
          if (res.data.code === 1) {
            this.balance = (res.data.data.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        })
      },  // 获取用户余额

      getHistory() {
        let type_dict = {
          1: "付费回答",
          2: "专家咨询",
          3: "告示板需求",
          4: "文章付费",
          5: "文章收入",
        };
        this.$api.account.get_history_pay().then(res => {
          if (res.data.code === 1) {
            if (res.data.data.length !== 0) {
              this.expense = [];  // 清空现有数据
              this.income = [];  // 清空现有数据
              res.data.data.forEach(item => {
                window.console.log(item);
                if (item.amount < 0) {
                  this.expense.unshift({
                    title: type_dict[item.type],
                    time: item.time,
                    price: Math.abs(item.amount),
                  })
                }  // 添加支出
                else {
                  this.income.unshift({
                    title: type_dict[item.type],
                    time: item.time,
                    price: Math.abs(item.amount),
                  })
                }  // 添加收入

              })
            }  // 处理数据
          }  // 如果获取成功
        })
      },  // 获取交易记录
    },
    mounted() {
      this.$emit('hiddenToolBar');
      this.getBalance();
      this.getHistory();
    }
  }
</script>

<style scoped>
  .wallet {
    height: 100vh;
    font-family: Helvetica, Arial, sans-serif;
    background: linear-gradient(0deg, white, whitesmoke 40%, #FFCC00);
  }
  .balance {
    font-size: 3em;
  }
  .card-info {
    padding: 8px;
  }
</style>
