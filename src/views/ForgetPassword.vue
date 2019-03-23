<template>
  <div class="forget-password">
    <div id="background">
      <div class="top">
        <v-btn @click="$router.back()" icon dark>
        <v-icon>arrow_back</v-icon>
        </v-btn>
      </div>
      <v-container class="container">
        <v-layout justify-space-between column fill-height>
          <v-flex shrink>
            <v-layout justify-center>
              <v-flex shrink>
                <img src="../assets/logo.png" width="120" height="120" style="width: 120px;height: 120px">
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <div class="head">
              <!--<h1 class="white&#45;&#45;text">你好，<br/>欢迎来到<span style="color: #ffcc00">&nbsp;&nbsp;&nbsp;批批乎</span></h1>-->
              <h1 class="white--text">完成验证<br />找回您的账号</h1>
            </div>
          </v-flex>
          <v-flex>
            <form class="form">
              <v-text-field
                  dark
                  v-model="account"
                  label="要找回的账号"
                  type="text"
              ></v-text-field>
              <v-layout>
                <v-flex grow>
                  <v-text-field
                      dark
                      v-model="code"
                      label="收到的验证码"
                      type="text"
                  ></v-text-field>
                </v-flex>

                <v-flex shrink>
                  <v-btn @click="sendCode" dark outline large :disabled="!sendAgain">{{ btnText }}</v-btn>
                </v-flex>
              </v-layout>
            </form>
            <br />
            <br />
            <v-btn @click="submit" color="primary" block large>提交验证</v-btn>
          </v-flex>
          <v-flex shrink>
            <p class="white--text">
              已有账号？<a @click="$router.push({name: 'login'})">立即登录</a>
              <span class="right">2019 GuaTeam</span>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ForgetPassword",

        data() {
            return {
                account: '',
                code: '',
                btnText: '发送验证码',  // 按钮文字
                sendAgain: true,  // 再次发送
            }
        },

        methods: {
            sendCode() {
                if (this.account === '') {
                    this.$store.commit('showInfo', '请输入邮箱或手机号码');
                    return
                }
                this.$api.account.send_check_code(this.account).then(res => {
                    if (res.data.code === 1) {
                        this.btnText = '再次发送';
                        this.sendAgain = false;
                        this.allowAgain();
                    } else if(res.data.code === -1){
                        this.$store.commit('showInfo', '该账号不存在');
                    }else{
                      this.$store.commit('showInfo', '未知错误，请刷新重试');
                    }
                }).catch(error => {
                    this.$store.commit('showInfo', '网络异常，请重试');
                    window.console.log(error);
                });
            },  // 发送验证码

            allowAgain() {
                let time = 59;
                let setTime = setInterval(() => {
                    this.btnText = '再次发送(' + time.toString() + ')';
                    time--;
                    if (time === 0) {
                        this.btnText = '再次发送';
                        clearInterval(setTime);
                    }
                }, 1000);
                setTimeout(() => {
                    this.sendAgain = true;
                }, 60000);
            },  // 允许再次发送

            submit() {
                this.$api.account.check_code(this.account, this.code).then(res => {
                    if (res.data.code === 1) {
                        // 验证通过
                        this.$router.push({name: 'set-new-password', query: {account: this.account}});  // 跳转时把account作为参数传递给下一个页面
                    } else {
                        this.$store.commit('showInfo', '验证码不正确');
                    }
                }).catch(error => {
                    this.$store.commit('showInfo', '请检查网络连接');
                    window.console.log(error);
                });
            },  // 提交验证
        }
    }
</script>

<style scoped>
  .forget-password {
    height: 100vh;
    width: 100%;
  }
  .forget-password, #background::before {
    background: url("../assets/background.jpg") 50% / cover no-repeat fixed;
  }
  #background {
    height: 100%;
    width: 100%;
    position: absolute;
    color: #A84631;
    border-radius: 20px;
    overflow: hidden;
    z-index: 2;
  }
  #background::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    filter: blur(3px);
    margin: -20px;
    z-index: -1;
  }
  .top {
    height: 10vh;
  }
  .container {
    padding: 2em;
    z-index: 1;
    height: 90vh;
  }
  .form {
    margin-top: 4em;
  }
  .head{
    margin-top: 1em;
  }
</style>
