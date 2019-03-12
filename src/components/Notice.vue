<template>
    <div class="notice">
        <v-list one-line>
            <template v-for="(item, index) in list1">
                <v-subheader v-if="item.header" :key="item.header">
                    {{ item.header }}
                </v-subheader>
                <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                <v-list-tile v-else :key="item.title" avatar @click="$router.push({name: item.to})">
                    <v-list-tile-avatar>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <!--<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>-->
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        props: ['list1']
    }
</script>

<style scoped>

</style>
