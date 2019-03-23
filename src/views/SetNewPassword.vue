<template>
  <div class="set-new-password">
    <div id="background">
      <div class="top">
        <v-btn @click="$router.push({name: 'login'})" icon dark>
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </div>
      <v-container class="container">
        <v-layout justify-space-between column fill-height>
          <v-flex shrink>
            <v-layout justify-center>
              <v-flex shrink>
                <img src="../assets/logo.png" width="120" height="120">
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <div class="head">
              <!--<h1 class="white&#45;&#45;text">你好，<br/>欢迎来到<span style="color: #ffcc00">&nbsp;&nbsp;&nbsp;批批乎</span></h1>-->
              <h1 v-if="!success" class="white--text">验证通过!<br />设置您的新密码</h1>
              <h1 v-else class="white--text">恭喜!<br />您的密码已经更新</h1>
            </div>
          </v-flex>

          <v-flex>
            <form class="form" v-if="!success">
              <v-text-field
                  dark
                  v-model="psw1"
                  label="输入新密码"
                  type="password"
                  :error-messages="psw1Errors"
                  @input="$v.psw1.$touch()"
                  @blur="$v.psw1.$touch()"
              ></v-text-field>

              <v-text-field
                  dark
                  v-model="psw2"
                  label="再次确认密码"
                  type="password"
                  :error-messages="psw2Errors"
                  @input="$v.psw2.$touch()"
                  @blur="$v.psw2.$touch()"
              ></v-text-field>
            </form>
            <br />
            <br />
            <v-btn v-if="!success" @click="submit" color="primary" block large>修改密码</v-btn>
            <v-btn v-else @click="$router.push({name: 'login'})" color="primary" block large>立刻登录</v-btn>
          </v-flex>
          <v-flex shrink>
            <p class="white--text">
              <!--已有账号？<a @click="$router.push({name: 'login'})">立即登录</a>-->
              <span class="right">2019 GuaTeam</span>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'


    export default {
        name: "SetNewPassword",

        data() {
            return {
                psw1: '',
                psw2: '',
                success: false,
            }
        },

        validations: {
            psw1: {required},
            psw2: {required},
        },

        computed: {
            psw1Errors() {
                const errors = [];
                if (!this.$v.psw1.$dirty) return errors;
                !this.$v.psw1.required && errors.push('请输入密码');
                return errors
            },
            psw2Errors() {
                const errors = [];
                if (!this.$v.psw2.$dirty) return errors;
                !this.$v.psw2.required && errors.push('请确认密码');
                !(this.psw1 === this.psw2) && errors.push('密码不一致');
                return errors
            }
        },

        methods: {

            submit() {
                this.$v.$touch();
                if (!this.$v.$anyError) {
                    if (this.psw1 !== this.psw2) {
                        return
                    }
                    this.$api.account.update_password(this.$route.query.account, this.psw1).then(res => {
                        if (res.data.code === 1) {
                            this.success = true;
                        } else {
                            this.$store.commit('showInfo', '密码重设失败，请重试');
                        }
                    }).catch(error => {
                        this.$store.commit('showInfo', '请检查网络连接');
                        window.console.log(error);
                    });
                }
            },  // 提交验证
        }
    }
</script>

<style scoped>
  .set-new-password {
    height: 100vh;
    width: 100%;
  }
  .set-new-password, #background::before {
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
