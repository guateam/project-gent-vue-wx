<template>
    <div class="register">
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
                    <v-flex xs1>
                        <v-layout align-center colunm fill-height>
                            <v-flex shrink>
                                <div class="head">
                                    <h1 class="white--text">欢迎加入我们!</h1>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex grow>
                        <form class="form">
                            <v-text-field
                                    dark
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    label="你的手机号码是？"
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    dark
                                    v-model="password"
                                    type="password"
                                    :error-messages="passwordErrors"
                                    label="设置你的密码"
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    dark
                                    v-model="password2"
                                    type="password"
                                    :error-messages="password2Errors"
                                    label="再次输入密码"
                                    @input="$v.password2.$touch()"
                                    @blur="$v.password2.$touch()"
                            ></v-text-field>
                        </form>
                        <v-btn @click="register" color="primary" block large>立刻注册</v-btn>
                    </v-flex>
                    <v-flex shrink>
                        <p class="white--text">
                            已有账号？<a @click="$router.push({name: 'login'})">返回登录</a>
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
        name: "register",

        validations: {
            email: {required},
            password: {required},
            password2: {required},
        },

        data() {
            return {
                email: '',
                password: '',
                password2: '',
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
            },
            password2Errors() {
                const errors = [];
                if (!this.$v.password2.$dirty) return errors;
                !this.$v.password2.required && errors.push('请确认密码');
                !(this.password === this.password2) && errors.push('密码不一致');
                return errors
            }
        },

        methods: {
            // 注册
            register() {
                this.$v.$touch();
                if (!this.$v.$anyError) {
                    // 如果两次密码不匹配，不执行操作
                    if (this.password !== this.password2) {
                        return
                    }
                    this.$api.account.register({
                        email: this.email,
                        password: this.password
                    }).then(res => {
                        if (res.data.code === 1) {
                            // 如果注册成功
                            this.login();
                        } else if (res.data.data === -1) {
                            // 如果用户已存在
                            // ...
                        }
                    })
                }
            },
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
                            this.DB({token: res.data.data.token, id: 1});
                            this.$store.commit('updateToken', res.data.data.token);
                            // 获取用户信息
                            this.$api.account.get_user_by_token().then(res => {
                                if (res.data.code === 1) {
                                    this.$store.commit('refreshUserInfo', res.data.data);
                                    this.$store.commit('login', this.$store.state);
                                    // 跳转到之前的页面
                                    this.$router.push({name: 'first-login'})
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
    .register {
        height: 100vh;
        width: 100%;
    }

    .register, #background::before {
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
        height: 90vh;
    }

    .form {
        margin-top: 4em;
    }

    .head {
        margin-top: 1em;
    }
</style>