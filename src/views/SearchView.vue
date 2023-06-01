<template>
    <div class = "content-block">
        <div class  = "form">
            <div class = "dx-fieldset">
                <div class = "dx-field">
                    <DxTextBox ref="refText" style = "width:100%" :value="internalValue" placeholder = "Suche" @value-changed="valuechanged" />
                </div>
            </div>
        </div>

        <div class="search-result">
            <DxLoadIndicator class="indicator" v-if="bIsLoading" :visible = "true" :height = "60" :width = "60" :showIndicator = "true" :showPane = "true" />
            <div v-else>
                <div v-if="searchResult.length === 0" class="error">
                    <h2>Es wurden keine Artikel gefunden</h2>
                </div>
                <div v-else>
                    <div class="cards">
                        <SearchResultCard class="card" v-for="article in searchResult.ARTICLES" :key="article.ARTICLE.ID" :article="article" @clicked="onClicked" />
                    </div>
                    <div class="footer card-footer">
                        <div>
                            <DxButton style="margin:1rem" v-if="currentPage > 1" @click="currentPage--" icon="minus" />
                            <DxButton style="margin:1rem" v-if="currentPage < searchResult.PAGES" @click="currentPage++" icon="plus" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SearchResultCard from '@/components/SearchResultCard.vue';
import DxButton from 'devextreme-vue/button';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxTextBox from 'devextreme-vue/text-box'

export default
{
    props: 
    {
        searchQuery: { type: String, default: "" }
    },
    components: 
    {
        DxLoadIndicator,
        DxTextBox,
        SearchResultCard,
        DxButton
    },
    emits: 
    [
        "update:searchQuery"
    ],
    data() {
        return {
            bIsLoading: false,

            internalValue: '',
            currentPage: 1,

            searchResult: []
        };
    },
    mounted() 
    {
        if (this.searchQuery !== null && this.searchQuery !== undefined && this.searchQuery !== "")
        {
            this.currentPage = 1;
            this.internalValue = this.searchQuery;

            this.search();
        }
    },

    methods: 
    {
        async search() 
        {
            if(this.internalValue === null || this.internalValue === undefined || this.internalValue === "")
                return;

            this.bIsLoading = true;
            const response = await this.$api.get(`Shop/Search?SearchText=${this.internalValue}&Page=${this.currentPage}&PageLimit=10`);

            this.searchResult = response.data.Data;
            this.bIsLoading = false;
        },

        valuechanged(e)
        {
            this.currentPage = 1;
            this.internalValue = e.value;

            this.search();
        },

        onClicked(id)
        {
            this.$router.push({ name: 'article', params: { id: id } });
        }
    },

    watch:
    {
        'searchQuery': function()
        {
            this.currentPage = 1;
            this.internalValue = this.searchQuery;

            this.search();
        },

        'currentPage': function()
        {
            this.search();
        }
    }
}

</script>

<style scoped>

.search-result
{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
}

.search-result .error
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.search-result .cards
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    align-items: left;
}

.card-footer
{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.card
{
    background-color: #363640;
    border-radius: 12px;
    display: inline-block;
    height: 250px;
    width: 250px;
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

.indicator
{
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

</style>