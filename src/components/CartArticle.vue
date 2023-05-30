<template>
    <div class="card">
        <div class = "article">
            <header>
                <strong style = "font-size: 20px;">{{ article.ARTICLE.TITLE }}</strong>
            </header>
            <main>
                <p style = "word-wrap: break-word;">{{ article.ARTICLE.DESCRIPTION }}</p>
            </main>
            <footer>
                <p>{{ (article.ARTICLE.PRICE * article.CARTARTICLE.QUANTITY) }} {{ article.CURRENCY.SYMBOL }}</p>
            </footer>
        </div>
        <div class = "options form">
            <div class = "dx-fieldset">
                <div class = "dx-field">
                    <DxNumberBox v-model:value="quantity" :min="1" :max="article.ARTICLE.QUANTITY" :showSpinButtons="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { DxNumberBox } from 'devextreme-vue/number-box';

export default
{
    props:
    {
        article: { type: Object, required: true }
    },

    emits: 
    [
        'quantityChanged'
    ],

    components: 
    { 
        DxNumberBox 
    },

    data()
    {
        return  {
            quantity: 0
        }
    },

    mounted()
    {
        this.quantity = this.article.CARTARTICLE.QUANTITY;
    },

    methods:
    {
    },

    watch:
    {
        'quantity' : function()
        {
            console.log(this.quantity);
            this.$emit('quantityChanged', this.article.ARTICLE.ID, this.quantity);
        }
    }
}

</script>

<style scoped>

.card
{
    border-radius: 12px;
    box-shadow: 0 1px 4px black;
    padding: 10px;
    width: 200px;
    height: 200px;
}

.article
{
    float: left;
    width: 50%;
}

.options
{
    float: left;
    width: 50%;
}

</style>