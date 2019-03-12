<template>
    <div class="friend-list">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>

                    <v-list>
                        <v-list-group
                                v-for="item in list"
                                :key="item.title"
                                v-model="item.active"
                                :prepend-icon="item.action"
                                no-action
                        >

                            <v-list-tile slot="activator">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile
                                    avatar
                                    v-for="subItem in item.items"
                                    :key="subItem.title"
                                    @click="$router.push({name:'chat',query:{id:subItem.user_id}})"
                            >
                                <v-list-tile-avatar>
                                    <img :src="subItem.headportrait" alt="">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="subItem.nickname"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="subItem.description"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon>{{ subItem.action }}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "FriendList",
        props: ['list']
    }
</script>

<style scoped>

    /*没用，废弃*/
    /*.v-list__tile .v-list__tile--link .v-list__tile--avatar .theme--light .v-list__group__items--no-action .v-list__tile{*/
    /*padding-left: 0 !important;*/
    /*}*/
</style>
