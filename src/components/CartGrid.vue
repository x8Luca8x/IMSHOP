<template>
    <div class = "cart">
        <div v-if="cart === null || cartArticles.length === 0">
            <p>Cart is empty</p>
        </div>
        <div v-else>
            <CartArticle class="article" v-for="article in cartArticles" :key="article.CARTARTICLE.ID" :article="article" @quantityChanged="onQuantityChanged" />
        </div>
    </div>
</template>

<script>

import CartArticle from '@/components/CartArticle.vue';

export default
{
    components: { CartArticle },
    data() {
        return {
            cart: {},
            cartArticles: [],
        };
    },
    async mounted() 
    {
        this.getCart();
    },

    methods:
    {
        async getCart()
        {
            const response = await this.$cart.getCart();
            this.cart = response.Data;

            if (this.cart !== null)
                this.cartArticles = this.cart.ARTICLES;
        },

        onQuantityChanged(articleId, quantity)
        {
            this.$cart.addItemToCart(articleId, quantity);
            this.getCart();
        }
    }
}
</script>

<style scoped>

.cart
{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    max-width: 1500px;
    border-radius: 12px;
    box-shadow: 0 1px 4px black;
}

.article
{
    margin: 1rem;
    width: 70vw;
}

</style>