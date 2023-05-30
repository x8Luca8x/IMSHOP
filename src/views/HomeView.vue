<template>
    <div class = "content-block">
        <ArticleGrid :apiRoute="apiRoute"/>
    </div>
</template>

<script>

import auth from '@/auth';
import ArticleGrid from '../components/ArticleGrid.vue';

export default
{
    components: 
    { 
        ArticleGrid 
    },

    data()
    {
        return {
            apiRoute: "Shop?Limit=5"
        }
    },

    created()
    {
        if(auth.loggedIn())
            this.apiRoute = "Shop/Suggestions?Limit=5";
    }
}

</script>