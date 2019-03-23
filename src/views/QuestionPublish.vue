<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'topic'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">添加话题</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
                <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent fullscreen="">
                        <template v-slot:activator="{ on }">
                            <div v-on="on" style="line-height: 1em;">发布</div>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">确认发布</span>
                            </v-card-title>
                            <v-card-text>
                                <!--<v-container grid-list-md>-->
                                <!--<v-layout wrap>-->
                                <!--<v-flex xs12 sm6>-->

                                <!--</v-flex>-->
                                <!--<v-flex xs12 sm6>-->
                                <!--<v-select-->
                                <!--v-model="e7"-->
                                <!--:items="states"-->
                                <!--label="选择分类"-->
                                <!--multiple-->
                                <!--chips-->
                                <!--persistent-hint-->
                                <!--&gt;</v-select>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs12 sm6>-->
                                <!--<v-select-->
                                <!--v-model="e7"-->
                                <!--:items="states"-->
                                <!--label="选择标签"-->
                                <!--multiple-->
                                <!--chips-->
                                <!--persistent-hint-->
                                <!--&gt;</v-select>-->
                                <!--</v-flex>-->
                                <!--</v-layout>-->
                                <!--</v-container>-->
                                <Form :model="formItem">
                                    <FormItem label="标题">
                                        <Input v-model="formItem.title" placeholder="请输入标题"></Input>
                                    </FormItem>
                                    <FormItem label="一级标签">
                                        <Select v-model="formItem.first_category"
                                                @on-change="get_second_category(value)">
                                            <Option :value="item.id" v-for="item in first_category">{{item.name}}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="二级标签">
                                        <Select v-model="formItem.second_category" multiple filterable remote
                                                :remote-method="get_tag_recommend" :loading="tag_loading"
                                                :disabled="formItem.first_category===undefined">
                                            <Option :value="item" v-for="item in second_category">{{item.name}}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="付费问题">
                                        <i-switch v-model="formItem.priced" size="large">
                                            <span slot="open">是</span>
                                            <span slot="close">否</span>
                                        </i-switch>
                                    </FormItem>
                                    <FormItem label="悬赏价格" v-if="formItem.priced">
                                        <Input v-model.number="formItem.price" type="text">
                                            <span slot="prepend">￥</span>
                                            <span slot="append">元</span>
                                        </Input>
                                        <!--<Slider :value="formItem.price" :step="0.1" :max="100"></Slider>-->
                                    </FormItem>
                                    <FormItem label="允许回答用户组" v-if="formItem.priced">
                                        <Select v-model="formItem.user_group" multiple filterable>
                                            <Option :value="item.id" v-for="item in user_group">{{item.name}}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </Form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" flat @click="dialog = false">取消</v-btn>
                                <v-btn color="primary" flat @click="send()">确认</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </div>
        </div>
        <div class="line"></div>

        <!--富文本编辑器采用的wangEditor-->
        <!--git地址https://github.com/wangfupeng1988/wangEditor-->


        <div style="width: 100%;height: 100%">
            <!--<div style="width: 100%;height: 3.6em;line-height: 3.5em;margin-bottom: 0.5em">-->
            <!--&lt;!&ndash;<div style="width: 94%;height: 3.6em;line-height: 3.5em;border-bottom: 1px solid #ccc;margin-bottom: 0.5em;margin-left: 3%;margin-right: 3%">&ndash;&gt;-->
            <!--&lt;!&ndash;<input type="text" placeholder="请输入标题"&ndash;&gt;-->
            <!--&lt;!&ndash;style="width: 100%;height: 3.5em;outline: none;line-height: 2em;font-size: 1.2em">&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<v-flex xs12 sm6 md4>-->
            <!--<v-text-field label="话题标题" required style="padding-left: 10px;padding-right: 10px"></v-text-field>-->
            <!--</v-flex>-->
            <!--</div>-->
            <!--<div id="editput" class="text">-->
            <!--<p>话题描述</p>-->
            <!--</div>-->
            <!--<div id="editbar" class="toolbar"></div>-->
            <quill-editor
                    v-model="content"
                    :options="editorOption"
            >
            </quill-editor>
            <v-dialog
                    v-model="busy"
                    persistent
                    width="300"
            >
                <v-card
                        color="primary"
                        dark
                >
                    <v-card-text>
                        正在发送···
                        <v-progress-linear
                                indeterminate
                                color="white"
                                class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    // import Edit from 'wangeditor';
    import * as Quill from 'quill' //引入编辑器
    import ImageResize from 'quill-image-resize-module'
    import {ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/imageResize', ImageResize);
    Quill.register('modules/ImageExtend', ImageExtend);
    export default {
        name: "QuestionPublish",
        components: {},
        data() {
            return {
                content: '',
                dialog: false,
                first_category: [
                    {name: '正在获取。。。', id: 0}
                ],
                second_category: [],
                user_group: [],
                formItem: {
                    title: undefined,
                    first_category: undefined,
                    second_category: [],
                    priced: false,
                    price: 0.00,
                    user_group: []
                },
                tag_loading: false,
                editorOption: {
                    modules: {
                        ImageExtend: {
                            loading: true,  // 可选参数 是否显示上传进度和提示语
                            name: 'picture',  // 图片参数名
                            size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                            action: 'https://hanerx.tk:5000/api/upload/upload_picture',  // 服务器地址, 如果action为空，则采用base64插入图片
                            // response 为一个函数用来获取服务器返回的具体图片地址
                            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                            // 则 return res.data.url
                            response: (res) => {
                                return res.data;
                            },
                        },
                        imageResize: {
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                        toolbar: {
                            container: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                [{'header': [1, 2, 3, 4, false]}, {'list': 'ordered'}, {'list': 'bullet'}],
                                [{'indent': '-1'}, {'indent': '+1'}],
                                ['blockquote', 'code-block', 'link', 'image', 'formula'],
                                [{'color': []}, {'background': []}]],
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    },
                    placeholder: '请在此输入内容'
                },
                busy: false,
            }
        },
        methods: {
            get_second_category() {
                this.formItem.second_category = [];
                this.$api.tags.get_child_tag(this.formItem.first_category).then(res => {
                    if (res.data.code === 1) {
                        this.second_category = res.data.data;
                    }
                })
            },
            get_user_group() {
                this.$api.account.get_user_group().then(res => {
                    if (res.data.code === 1) {
                        this.user_group = [];
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.user_group.push({name: res.data.data[i], id: i})
                        }
                    }
                })
            },
            get_first_category() {
                this.$api.tags.get_first_tag().then(res => {
                    if (res.data.code === 1) {
                        this.first_category = res.data.data;
                    }
                })
            },
            get_tag_recommend(query) {
                if (query !== '') {
                    this.tag_loading = true;
                    this.$api.tags.get_tag_recommend(this.formItem.first_category, query).then(res => {
                        if (res.data.code === 1) {
                            this.second_category = res.data.data;
                            this.tag_loading = false;
                        }
                    })
                }
            },
            set_tags(first_category) {
                this.formItem.second_category.forEach(item => {
                    if (item.id === -1) {
                        this.$api.tags.add_tag(first_category, item.name, 2).then(res => {
                            if (res.data.code === 1) {
                                item.id = res.data.data.id;
                            }
                        })
                    }

                });
            },
            get_tags(first_category, second_category) {
                let back = first_category;
                second_category.forEach(item => {
                    back += ',' + item.id;
                });
                return back;
            },
            send() {
                if (this.formItem.title === '' || this.formItem.title == null) {
                    this.$store.commit('showInfo', '标题不能为空！');
                    return;
                }
                if (this.content === '' || this.content == null) {
                    this.$store.commit('showInfo', '内容不能为空！');
                    return;
                }
                if (this.formItem.price <= 0 && this.formItem.priced) {
                    this.$store.commit('showInfo', '价格不能为负！');
                    return;
                }
                if (this.formItem.first_category == null || this.formItem.first_category === '') {
                    this.$store.commit('showInfo', '一级标签不能为空！');
                    return;
                }
                if (this.formItem.user_group.length === 0 && this.formItem.priced) {
                    this.$store.commit('showInfo', '回答用户组不能为空！');
                    return;
                }
                this.busy = true;
                this.set_tags(this.formItem.first_category);
                let that = this;
                setTimeout(() => {
                    let tags = that.get_tags(that.formItem.first_category, that.formItem.second_category);
                    if (this.formItem.priced) {
                        let allowed_user = that.formItem.user_group.join(',');
                        let data = {
                            title: that.formItem.title,
                            token: that.$store.state.token,
                            price: that.formItem.price,
                            description: that.content,
                            tags: tags,
                            allowed_user: allowed_user
                        };
                        that.$api.questions.add_priced_question(data).then(res => {
                            if (res.data.code === 1) {
                                this.busy = false;
                                that.$router.back();
                            } else {
                                this.$store.commit('showInfo', res.data.msg);
                                this.busy = false;
                            }
                        })
                    } else {
                        let data = {
                            title: that.formItem.title,
                            token: that.$store.state.token,
                            description: that.content,
                            tags: tags,
                        };
                        that.$api.questions.add_question(data).then(res => {
                            if (res.data.code === 1) {
                                this.busy = false;
                                that.$router.back();
                            } else {
                                this.$store.commit('showInfo', res.data.msg);
                            }
                        });
                    }
                }, 3000)
            }
        },
        mounted() {
            // var editor = new Edit(this.$refs.editor)
            // editor.customConfig.onchange = (html) => {
            //     this.editorContent = html
            // }
            // editor.create()
            // var editor1 = new Edit('#editbar', '#editput')  // 两个参数也可以传入 elem 对象，class 选择器
            // editor1.create()
            this.get_user_group();
            this.get_first_category();
            if (this.$store.state.userInfo.level < 2) {
                this.editorOption = {
                    modules: {
                        ImageExtend: {
                            loading: true,  // 可选参数 是否显示上传进度和提示语
                            name: 'picture',  // 图片参数名
                            size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                            action: 'https://hanerx.tk:5000/api/upload/upload_picture',  // 服务器地址, 如果action为空，则采用base64插入图片
                            // response 为一个函数用来获取服务器返回的具体图片地址
                            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                            // 则 return res.data.url
                            response: (res) => {
                                return res.data;
                            },
                        },
                        imageResize: {
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                        toolbar: {
                            container: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                [{'header': [1, 2, 3, 4, false]}, {'list': 'ordered'}, {'list': 'bullet'}],
                                [{'indent': '-1'}, {'indent': '+1'}],
                                ['blockquote', 'code-block', 'link', 'image', 'formula'],
                            ],
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    },
                    placeholder: '请在此输入内容'
                };
            }
        }
    }
</script>

<style scoped>
    .bigbox {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }

    .head {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        margin-bottom: 1em;
        background-color: #ffd633;
    }

    .line {
        width: 100%;
        height: 4em;
        background-color: #eee;
    }

    .toolbar {
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
    }

    .text {
        border-bottom: 1px solid #ccc;
        height: 400px;
        font-size: 1.1em;
    }

    .quill-editor {
        height: 100%;
    }
</style>
