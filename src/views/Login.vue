<template>
    <div class="login">
        <div id="background">
            <div class="top">
                <!--<v-btn @click="$router.push({name: 'index'})" icon dark>-->
                    <!--<v-icon>arrow_back</v-icon>-->
                <!--</v-btn>-->
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
                            <h1 class="white--text">嗨!<br />欢迎回来</h1>
                        </div>
                    </v-flex>
                    <v-flex>
                        <form class="form">
                            <v-text-field
                                dark
                                prepend-icon="email"
                                v-model="email"
                                :error-messages="emailErrors"
                                label="手机号"
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                dark
                                prepend-icon="lock"
                                v-model="password"
                                :error-messages="passwordErrors"
                                label="密码"
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                                :append-icon="show ? 'visibility_off' : 'visibility'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                            ></v-text-field>
                        </form>
                        <span @click="forgetPassword" class="right">忘记密码?</span>
                        <br />
                        <br />
                        <v-btn @click="login" color="primary" block large>登录</v-btn>
                    </v-flex>
                    <v-flex shrink>
                        <p class="white--text">
                            还没有账号？<a @click="$router.push({name: 'register'})">立即注册</a>
                            <span class="right">2019 GuaTeam</span>
                        </p>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import {required, email} from 'vuelidate/lib/validators'


    export default {
        name: "Login",

        validations: {
            email: {required},
            password: {required},
        },

        data() {
            return {
                show: false,
                email: 'zhangyu199946@126.com',
                password: 'zhangyuk',
            }
        },

        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required && errors.push('请输入手机号码');
                return errors
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('请输入密码');
                return errors
            }
        },

        methods: {
            forgetPassword() {
                this.$store.commit('showInfo', '忘记密码');
            },  // 忘记密码
            // 登录
            login() {
                this.$v.$touch();
                if (!this.$v.$anyError) {
                    this.$api.account.login({
                        username: this.email,
                        password: this.password
                    }).then(res => {
                        if (res.data.code === 1) {
                            // 保存token
                            import('js-cookie').then(Cookies => {
                                Cookies.set('token', res.data.data.token)
                            });
                            this.DB({token:res.data.data.token,id:1});
                            this.$store.commit('updateToken', res.data.data.token);
                            // 获取用户信息
                            this.$api.account.get_user_by_token().then(res => {
                                if (res.data.code === 1) {
                                    this.$store.commit('refreshUserInfo', res.data.data);
                                    this.$store.commit('login', this.$store.state);
                                    // 跳转到之前的页面
                                    this.$router.push(this.$route.query.redirect || {name: 'index'})
                                }
                            });
                        }
                    })
                }
            },
            DB(data) {
                let myDB = {
                    name: "project-agent", version: 1, db: null
                };

                function openDB(name) {
                    let version = 1;
                    let request = window.indexedDB.open(name, version);
                    request.onerror = function (e) {
                        window.console.log(e.currentTarget.error.message);
                    };
                    request.onsuccess = function (e) {
                        myDB.db = e.target.result;
                    };
                    request.onupgradeneeded = function (e) {
                        let db = e.target.result;
                        if (!db.objectStoreNames.contains("user")) {
                            db.createObjectStore("user", {keyPath: 'id', autoIncrement: true});
                        }
                    };
                }

                function addData(db, storeName, data) {
                    let transaction = db.transaction(storeName, 'readwrite');
                    let store = transaction.objectStore(storeName);
                    store.put(data)
                }

                openDB('user');
                setTimeout(function () {
                    addData(myDB.db, "user", data);
                }, 1000);
            }
        }
    }
</script>

<style scoped>
    .login {
        height: 100vh;
        width: 100%;
    }
    .login, #background::before {
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
