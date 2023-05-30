class Cart
{
    _api = null;
    _cachedCart = null;

    constructor(api)
    {
        this._api = api;
    }

    async getCart()
    {
        if(this._cachedCart === null)
        {
            try
            {
                const response = await this._api.get('Shop/Cart');
                this._cachedCart = response.data;
            }
            catch
            {
                this._cachedCart = null;
            }
        }

        return this._cachedCart;
    }

    async addItemToCart(ArticleId, Quantity)
    {
        await this._api.put('Shop/Cart', { ARTICLEID: ArticleId, QUANTITY: Quantity });
        this._cachedCart = null;
    }
}

export default Cart;