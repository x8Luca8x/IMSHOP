<template>
    <div class="content-block">
        <DxLoadIndicator class="loading-indicator" v-if="bIsLoading" :visible="true" height="60px" width="60px" :showIndicator="true" :showPane="true" />
        <div v-else>
            <div v-if="bFailed">
                <h1>{{ FailureMessage }}</h1>
            </div>
            <div v-else>
                <FrmArticle :article="article" :articleInfo="articleInfo" />
            </div>
        </div>
    </div>
</template>

<script>

import FrmArticle from '@/components/frmArticle.vue';
import DxLoadIndicator from 'devextreme-vue/load-indicator';

export default
{
    props: 
    {
        id: { type: String, required: true }
    },

    components: 
    {
        DxLoadIndicator,
        FrmArticle
    },

    data() 
    {
        return {
            articleId: NaN,
            article: null,
            articleInfo: null,
            bIsLoading: true,
            bFailed: false,
            FailureMessage: "Failed to load article"
        };
    },

    mounted() 
    {
        this.loadData();
    },

    methods:
    {
        async loadData()
        {
            this.bIsLoading = true;
            this.bFailed = false;

            this.articleId = parseInt(this.id);
            if(isNaN(this.articleId))
            {
                this.bFailed = true;
                this.FailureMessage = "Invalid article id";
                
                return;
            }

            try
            {
                const articleRes = await this.$api.get(`Shop?ArticleId=${this.articleId}`);
                const articleInfoRes = await this.$api.get(`Shop/Info?ArticleId=${this.articleId}`);

                if (articleRes.data.Data.length == 0)
                    throw articleRes.data.Message;

                this.article = articleRes.data.Data[0];
                this.articleInfo = articleInfoRes.data.Data;

                this.$api.put(`Shop/View?ArticleId=${this.articleId}`, null);
            }
            catch (e) 
            {
                this.bFailed = true;
                if(e.response)
                    this.FailureMessage = e.response.data.Message;
                else
                    this.FailureMessage = e.toString();
            }
            finally 
            {
                this.bIsLoading = false;
            }
        }
    },

    watch:
    {
        'id' : function()
        {
            this.loadData();
        }
    }
}

</script>

<style scoped>

.loading-indicator
{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>