<template>
    <div class="card">
        <ul style = "width: 25%">
            <li class="article-info">
                <strong style="font-size:24px">{{ article.ARTICLE.TITLE }}</strong>
                <p class="desc" style="word-wrap: normal;">{{ article.ARTICLE.DESCRIPTION }}</p>
            </li>
        </ul>
        <ul style = "margin-left: 25px; width: calc(50% - 25px)">
            <li class="images">
                <div v-if="!isPreview && articleInfo.NUMIMAGES > 0 ">

                </div>
                <div v-else>
                    <img class="showing-image" src="https://via.placeholder.com/300x300" alt="Placeholder" />
                    <div class="image-row">
                        <img class="image-row-element" src="https://via.placeholder.com/95x95" alt="Placeholder" />
                        <img class="image-row-element" src="https://via.placeholder.com/95x95" alt="Placeholder" />
                        <img class="image-row-element" src="https://via.placeholder.com/95x95" alt="Placeholder" />
                        <img class="image-row-element" src="https://via.placeholder.com/95x95" alt="Placeholder" />
                        <img class="image-row-element" src="https://via.placeholder.com/95x95" alt="Placeholder" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default
{
    props:
    {
        article: { type: Object, required: true },
        articleInfo: { type: Object, required: true },

        isPreview: { type: Boolean, required: false, default: false }
    }
}

</script>

<style scoped>

.card
{
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: left;
    margin: 0 auto;
    width: 100%;
    max-width: 1500px;
    border-radius: 12px;
    box-shadow: 0 1px 4px black;
    padding: 1rem;
}

.card ul
{
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.article-info
{
    min-width: 200px;
}

.article-info .desc
{
    word-wrap: normal;
    overflow-x: scroll;
    overflow-y: scroll;
    max-height: 200px;
}

.article-info .desc::-webkit-scrollbar
{
    display: none;
}

.images
{
    display: flex;
    flex-direction: column;;
    align-items: center;
    justify-content: center;
}

.image-row
{
    width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.image-row-element
{
    margin-left: 5px;
}

.image-row-element:first-child
{
    margin-left: 0;
}

</style>