<template>
    <div>
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.back()">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>充值</span>
            </v-toolbar-title>
        </v-toolbar>
        <v-form style="margin-top: 1em">
            <v-container>
                <v-layout row>
                    <v-flex xs1 sm6 align-center justify-center style="display: flex">
                        <h2>￥</h2>
                    </v-flex>
                    <v-flex xs11 sm6 style="font-size: 1.5em;font-weight: bold;">
                        <v-text-field
                                :rules="[rules.number]"
                                v-model="value"
                                label="充值金额"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-btn block color="info" style="position: fixed;bottom: 33.33%;" @click="recharge()">确认充值</v-btn>
    </div>
</template>

<script>
    export default {
        name: "recharge",
        data(){
            return{
                value:"",
                save:"",
                rules: {
                    number: value => {
                        let reg = /^[0-9]*[1-9][0-9]*$/
                        let flag = reg.test(value)
                        if(flag){
                            this.save = value
                        }else{
                            this.value = this.save
                        }
                    },
                },
            }
        },
        methods:{
            recharge(){
                let data = {
                    token:this.$store.state.token,
                    num:this.value,
                }
                this.$api.account.recharge(data).then(res =>{
                     if(res.data.code === 1){
                          this.$router.push({name: 'wallet'})
                     }else if(res.data.code === 0){
                         this.$store.commit('showInfo', '充值失败！');
                     }else if(res.data.code === -2){
                        this.$store.commit('showInfo', '用户不存在！');
                     }
                 })
            },

        },
        watch:{

        },
        mounted:{

        },
    }
</script>

<style scoped>

</style>
