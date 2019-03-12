<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'topic'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">发布文章</span>
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
                                <Form :model="formItem">
                                    <FormItem label="标题">
                                        <Input v-model="formItem.title" placeholder="请输入标题"></Input>
                                    </FormItem>
                                    <FormItem label="封面">
                                        <Upload action="https://hanerx.tk:5000/api/upload/upload_picture" name="picture"
                                                :on-success="upload" :default-file-list="upload_list"
                                                :on-remove="remove">
                                            <Button icon="ios-cloud-upload-outline">上传封面</Button>
                                        </Upload>
                                    </FormItem>
                                    <FormItem label="封面预览" v-if="formItem.cover!==undefined">
                                        <img width="100%" :src="formItem.cover" >
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
                                    <FormItem label="文章简介">
                                        <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入文章简介···"></Input>
                                    </FormItem>
                                    <FormItem label="付费文章">
                                        <i-switch v-model="formItem.priced" size="large">
                                            <span slot="open">是</span>
                                            <span slot="close">否</span>
                                        </i-switch>
                                    </FormItem>
                                    <FormItem label="文章价格" v-if="formItem.priced">
                                        <Input v-model.number="formItem.price" type="text">
                                            <span slot="prepend">￥</span>
                                            <span slot="append">元</span>
                                        </Input>
                                        <!--<Slider :value="formItem.price" :step="0.1" :max="100"></Slider>-->
                                    </FormItem>
                                </Form>

                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" flat @click="dialog = false">关闭</v-btn>
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
            <quill-editor
                    v-model="content"
                    :options="editorOption">
            </quill-editor>
        </div>

    </div>
</template>

<script>
    import * as Quill from 'quill'  //引入编辑器
    import ImageResize from 'quill-image-resize-module'
    import {ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import 'iview/dist/styles/iview.css';

    Quill.register('modules/imageResize', ImageResize);
    Quill.register('modules/ImageExtend', ImageExtend);

    export default {
        name: "ArticlePublish",
        data() {
            return {
                content: '',
                dialog: false,
                first_category: [],
                second_category: [],
                upload_list: [],
                formItem: {
                    title: undefined,
                    first_category: undefined,
                    second_category: [],
                    priced: false,
                    price: 0.00,
                    cover: undefined,
                    description: undefined,
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

                rules: {
                    counter: value => value.length <= 30 || '字数不能超过30个',
                    required: value => !!value || '该栏不能为空.',
                }
            }
        },
        watch: {},
        methods: {
            upload(response, file, fileList) {
                this.upload_list = [{
                    name: file.name,
                    url: response.data
                }];
                this.formItem.cover = response.data;
            },
            remove(){
                this.formItem.cover=undefined
            },
            get_second_category() {
                this.formItem.second_category = [];
                this.$api.tags.get_child_tag(this.formItem.first_category).then(res => {
                    if (res.data.code === 1) {
                        this.second_category = res.data.data;
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
                this.set_tags(this.formItem.first_category);
                let that = this;
                setTimeout(() => {
                    let tags = that.get_tags(that.formItem.first_category, that.formItem.second_category);
                    let data = {
                        title: that.formItem.title,
                        token: that.$store.state.token,
                        price: that.formItem.price,
                        content: that.content,
                        tags: tags,
                        cover: that.formItem.cover,
                        free:that.formItem.priced,
                        description:that.formItem.description
                    };
                    that.$api.article.add_article(data).then(res => {
                        if (res.data.code === 1) {
                            that.$router.back();
                        } else {
                            this.$store.commit('showInfo', res.data.msg);
                        }
                    })

                }, 3000)
            }
        },
        mounted() {
            this.get_first_category();
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
