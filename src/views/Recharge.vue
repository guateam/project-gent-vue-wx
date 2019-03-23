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
                                v-model="value"
                                label="充值金额"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-btn block color="info" style="position: fixed;bottom: 33.33%;">确认充值</v-btn>
    </div>
</template>

<script>
    export default {
        name: "recharge"
    }
</script>

<style scoped>

</style>
