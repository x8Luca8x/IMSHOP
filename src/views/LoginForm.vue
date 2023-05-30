<template>
    <form id="form-block" @submit.prevent="onLogin">
        <DxForm 
            ref="form" 
            :form-data="formData"
            :label-location="labelLocation"
            :show-colon-after-label="showColon"
            :styling-mode="stylingMode"
        >
            <DxItem data-field="email" editor-type="dxTextBox" :editor-options="emailOptions">
                <DxLabel text="Email" />
                <DxRequiredRule message="Email ist erforderlich" />
                <DxEmailRule message="Ungültiges email format" />
            </DxItem>
            <DxItem data-field="password" editor-type="dxTextBox" :editor-options="passwordOptions">
                <DxLabel text="Passwort" />
                <DxRequiredRule message="Passwort ist erforderlich" />
            </DxItem>
            <DxButtonItem>
                <DxButtonOptions
                    width="100%"
                    type="default"
                    template="signInTemplate"
                    :use-submit-behavior="true"
                >
                </DxButtonOptions>
            </DxButtonItem>
            <template #signInTemplate>
                <div>
                    <span class="dx-button-text">
                        <DxLoadIndicator v-if="loadVisible" width="24px" height="24px" :visible="true" />
                        <span v-if="!loadVisible">Sign In</span>
                    </span>
                </div>
            </template>
        </DxForm>
    </form>
</template>

<script>

import DxLoadIndicator from "devextreme-vue/load-indicator";
import { DxForm, DxItem, DxLabel, DxEmailRule, DxRequiredRule, DxButtonItem, DxButtonOptions } from 'devextreme-vue/form';
import auth from '@/auth';
import notify from 'devextreme/ui/notify';

export default
{
    components: 
    {
        DxLoadIndicator,
        DxForm,
        DxItem,
        DxLabel,
        DxEmailRule,
        DxRequiredRule,
        DxButtonItem,
        DxButtonOptions
    },

    data()
    {
        return {
            formData: {
                email: "",
                password: ""
            },

            emailOptions: {
                mode: "email"
            },

            passwordOptions: {
                mode: "password"
            },

            loadPosition: { of: '#form-block'},
            loadVisible: false,

            labelLocation: "top",
            showColon: true,
            stylingMode: 'underlinded',
        }
    },

    async created()
    {
        await auth.getUser();
        if(auth.loggedIn())
            this.$router.push(this.$route.query.redirect || '/home' );
    },

    methods:
    {
        async onLogin()
        {
            const res = this.$refs.form.instance.validate();
            if(!res.isValid)
                return;

            this.loadVisible = true;
            auth.logIn(this.formData.email, this.formData.password).then((r) => 
            { 
                console.log(r);
                if(r.isOk) 
                    this.$router.push(this.$route.query.redirect || '/home' );
                else 
                {
                    this.loadVisible = false;
                    notify(r.message, 'error', 2000);
                }

            }).catch(() => this.loadVisible = false);
        }
    }
}

</script>

<style scoped>

#form-block
{
    margin-top: -30px;
}

</style>