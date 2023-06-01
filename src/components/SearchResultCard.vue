<template>
    <div class="result" @click="onClicked">
        <header>
            <strong style="font-size: 20px;">{{ article.ARTICLE.TITLE }}</strong>
        </header>
        <main>
            <img src = "https://picsum.photos/300/300" alt = "" width="90">
        </main>
        <footer class="footer">
            <p>{{ article.ARTICLE.PRICE }} {{ article.CURRENCY.SYMBOL }}</p>
        </footer>
    </div>
</template>

<script>

export default
{
    props:
    {
        article: { type: Object, required: true, default: null }
    },

    emits:
    [
        'clicked'
    ],

    methods:
    {
        onClicked()
        {
            this.$emit('clicked', this.article.ARTICLE.ID);
        }
    }
}

</script>

<style scoped>

.result main
{
    margin: 5px;
    height: 60%;
}

.result main img
{
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

</style>