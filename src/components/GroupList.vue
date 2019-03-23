<template>
    <div class="group-list">
        <v-list>
            <template v-for="(item, index) in list">
                <v-subheader v-if="item.header" :key="index">
                    {{ item.header }}
                </v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-tile v-else :key="index" avatar @click="$router.push({name:'group-chat', params: {id: item.id, title: item.name}})">
                    <v-list-tile-avatar>
                        <img :src="item.avatar" alt="">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title>{{item.content}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "GroupList",
        props: ['list']
    }
</script>

<style scoped>

</style>
