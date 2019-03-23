<template>
    <div class="login">
        <v-dialog v-model="dialog" fullscreen>
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
                                    <img src="../assets/logo.png" width="120" height="120"
                                         style="width: 120px;height: 120px">
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs2>
                            <div class="head">
                                <!--<h1 class="white&#45;&#45;text">你好，<br/>欢迎来到<span style="color: #ffcc00">&nbsp;&nbsp;&nbsp;批批乎</span></h1>-->
                                <h1 class="white--text">嗨!<br/>欢迎回来</h1>
                            </div>
                        </v-flex>
                        <v-flex v-show="codelogin===0">
                            <form class="form">
                                <v-text-field
                                        dark
                                        prepend-icon="account_circle"
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        label="手机号/邮箱"
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
                            <span style="color: #ffcc00" @click="loginByCode">验证码登录</span>
                            <span @click="forgetPassword" class="right">忘记密码?</span>
                            <br/>
                            <br/>
                            <v-btn @click="login" color="primary" block large>登录</v-btn>
                        </v-flex>


                        <v-flex v-show="codelogin===1">
                            <form class="form">
                                <v-text-field
                                        dark
                                        v-model="email"
                                        label="手机号/邮箱"
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
                                        <v-btn @click="sendCode" dark outline large :disabled="!sendAgain">{{ btnText
                                            }}
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                            <span style="color: #ffcc00" @click="loginByPassword">账号密码登录</span>
                            <span @click="forgetPassword" class="right">忘记密码?</span>
                            <br/>
                            <br/>
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
        </v-dialog>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'


    export default {
        name: "Login",

        validations: {
            email: {required},
            password: {required},
        },

        data() {
            return {
                show: false,
                email: '',
                password: '',
                dialog: true,
                codelogin: 0,
                account: '',
                code: '',
                btnText: '发送验证码',  // 按钮文字
                sendAgain: true,  // 再次发送
            }
        },

        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required && errors.push('请输入手机号或邮箱');
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
            loginByCode() {
                this.codelogin = 1
            },
            loginByPassword() {
                this.codelogin = 0
            },
            forgetPassword() {
                // this.$store.commit('showInfo', '忘记密码');
                this.$router.push({name: 'forget-password'});
            },  // 忘记密码
            // 登录
            login() {
                this.$v.$touch();
                if (!this.$v.$anyError) {
                    if (this.codelogin === 0) {
                        this.login_by_password()
                    } else if (this.codelogin === 1) {
                        this.login_by_message()
                    }

                }
                this.$store.commit('closeDialog');
            },
            login_by_password() {
                this.$api.account.login({
                    username: this.email,
                    password: this.password
                }).then(res => {
                    if (res.data.code === 1) {
                        // 保存token
                        import('js-cookie').then(Cookies => {
                            Cookies.set('token', res.data.data.token)
                        });
                        this.DB({token: res.data.data.token, id: 1, username: this.email, password: this.password});
                        this.DBset({username: this.email, password: this.password, id: 1});
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
                    } else if (res.data.code === 0) {
                        this.$store.commit('showInfo', '用户名或密码错误！');
                    } else {
                        this.$store.commit('showInfo', '网络错误，请检查网络！');
                    }
                })
            },
            login_by_message() {
                this.$api.account.login_by_message(this.code, this.email).then(res => {
                    if (res.data.code === 1) {
                        // 保存token
                        import('js-cookie').then(Cookies => {
                            Cookies.set('token', res.data.data.token)
                        });
                        this.DB({token: res.data.data.token, id: 1});
                        this.DBset({username: this.email, password: '', id: 1});
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
                    } else if (res.data.code === 0) {
                        this.$store.commit('showInfo', '用户名或验证码错误！');
                    } else {
                        this.$store.commit('showInfo', '网络错误，请检查网络！');
                    }
                })
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
            },
            DBset(data) {
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
                        if (!db.objectStoreNames.contains("account")) {
                            db.createObjectStore("account", {keyPath: 'id', autoIncrement: true});
                        }
                    };
                }

                function addData(db, storeName, data) {
                    let transaction = db.transaction(storeName, 'readwrite');
                    let store = transaction.objectStore(storeName);
                    store.put(data)
                }

                openDB('account');
                setTimeout(function () {
                    addData(myDB.db, "account", data);
                }, 1000);
            },
            sendCode() {
                if (this.email === '') {
                    this.$store.commit('showInfo', '请输入邮箱或手机号码');
                    return
                }
                this.$api.account.send_check_code(this.email).then(res => {
                    if (res.data.code === 1) {
                        this.btnText = '再次发送';
                        this.sendAgain = false;
                        this.allowAgain();
                    } else if (res.data.code === -1) {
                        this.$store.commit('showInfo', '该账号不存在');
                    } else {
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
                        this.$router.push({name: 'topic', query: {account: this.account}});  // 跳转时把account作为参数传递给下一个页面
                    } else {
                        this.$store.commit('showInfo', '验证码不正确');
                    }
                }).catch(error => {
                    this.$store.commit('showInfo', '请检查网络连接');
                    window.console.log(error);
                });
            },  // 提交验证
            DBget() {
                let that = this;
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
                        if (!db.objectStoreNames.contains("account")) {
                            db.createObjectStore("account", {keyPath: 'id', autoIncrement: true});
                        }
                    };
                }

                function getDataByKey(db, storeName, value) {
                    let transaction = db.transaction(storeName, 'readwrite');
                    let store = transaction.objectStore(storeName);
                    let request = store.get(value);
                    request.onsuccess = function (e) {
                        let data = e.target.result;
                        that.email = data.username;
                        that.password = data.password;
                    };
                }

                openDB('account');
                setTimeout(function () {
                    getDataByKey(myDB.db, 'account', 1)
                }, 1000);
            },
        },
        mounted() {
            this.DBget();
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
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
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

    .head {
        margin-top: 1em;
    }
</style>
