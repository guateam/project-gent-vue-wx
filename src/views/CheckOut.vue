<template>
    <div>
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.back()">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>提现</span>
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
                                v-model="value"
                                label="提现金额"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs1 sm6 align-center justify-center style="display: flex">
                        <v-icon>payment</v-icon>
                    </v-flex>
                    <v-flex xs11 sm6 style="font-size: 1.5em;font-weight: bold;">
                        <v-text-field
                                v-model="value"
                                label="支付宝账号/银行卡号"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-btn block color="info" style="position: fixed;bottom: 33.33%;">预计两小时内到账，确认提现</v-btn>
    </div>
</template>

<script>
    export default {
        name: "check-out"
    }
</script>

<style scoped>

</style>

