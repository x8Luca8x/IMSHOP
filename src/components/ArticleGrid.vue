<template>
    <div>
        <ArticleCard v-for="article in articles" :key="article.ARTICLE.ID" :article="article" @onClicked="onClicked" />
    </div>
</template>

<script>

import ArticleCard from './ArticleCard.vue';

export default
{
    props:
    {
        apiRoute: { type: String, required: false, default: "Shop" }
    },

    components: 
    { 
        ArticleCard 
    },
    data() 
    {
        return {
            articles: []
        }
    },
    mounted() 
    {
        this.$api.get(this.apiRoute).then(res =>
        {
            this.articles = res.data.Data;
        });
    },

    methods:
    {
        async loadData()
        {
            const resposne = await this.$api.get(this.apiRoute);
            this.articles = resposne.data.Data;
        },

        onClicked(e)
        {
            this.$router.push({ name: 'article', params: { id: e } });
        }
    },

    watch:
    {
        'apiRoute': function()
        {
            this.loadData();
        }
    }
}

</script>