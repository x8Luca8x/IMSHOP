<template>
    <div class = "card" @click="clickedEvent">
        <header class = "header">
            <strong>{{ article.ARTICLE.TITLE }}</strong>
        </header>
        <main class = main>

        </main>
        <footer class = "footer">
            <strong >{{ article.ARTICLE.PRICE }} {{ article.CURRENCY.SYMBOL }}</strong>
        </footer>
    </div>
</template>

<script>

export default
{
    props: 
    {
        article: { type: Object, required: true }
    },

    emits:
    [
        'onClicked'
    ],

    methods:
    {
        clickedEvent()
        {
            this.$emit('onClicked', this.article.ARTICLE.ID);
        }  
    }
}

</script>

<style scoped>

.card
{
    background-color: #363640;
    border-radius: 12px;
    display: inline-block;
    height: 400px;
    width: 300px;
    margin: 1rem;
    padding: 10px;
    position: relative;
    box-shadow: 0 1px 4px black;

    transition: all 0.3s ease;
}

.card:hover
{
    box-shadow: 0 2px 8px #1f1f1f;
    cursor: pointer;
    transform: scale(1.02);
}

.header
{
    font-size: 30px;
}

.main
{
    height: calc(100% - 90px);
}

</style>