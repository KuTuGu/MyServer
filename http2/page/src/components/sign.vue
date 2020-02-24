<template>
    <div id="sign">
        <Card id="card">
            <p slot="title">
                <Icon type="md-person-add" />
                Sign up/in
            </p>
            <div style="margin: 20px 0;">
                Username：
                <Input v-model="username" prefix="ios-contact" size="large" placeholder="username" style="width: auto" clearable  autocomplete="on" />
            </div>
            <div style="margin: 30px 0;">
                Password：
                <Input v-model="password" prefix="ios-bookmark" size="large" placeholder="password" style="width: auto" type="password" clearable  autocomplete="on" />
            </div>
            <div>
                <Button style="margin: 0 30px;" @click.native="signupAsync" >Sign up</Button>
                <Button type="primary" style="margin: 0 30px;" @click.native="loginAsync" >Sign in</Button>
            </div>
        </Card>
    </div>
</template>

<script>
import { Card, Input, Button, Icon } from 'view-design';
import gql from 'graphql-tag';
import Client from '../graphql';

export default {
    name: 'Sign',
    components: {
        Card, Input, Button, Icon
    },
    data(){
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        loginAsync() {
            const msg = this.$Message.loading({
                content: 'Sign in...',
                duration: 0
            });
            const query = gql`
                query login {
                    login(input: {
                        username: "${this.username}", 
                        password: "${this.password}"
                    }){
                        status
                        message
                        token
                    }
                }
            `

            return Client.query({query})
                .then(res => {
                    if(res.data.login.status){
                        this.$Message.success({
                            background: true,
                            content: res.data.login.message
                        });
                        // set cookie 1 day
                        const exp = new Date();
                        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
                        document.cookie = `token=${res.data.login.token};expires=${exp.toGMTString()};path=/`;
                    }
                    else{
                        this.$Message.error({
                            background: true,
                            content: res.data.login.message
                        })
                    }
                }).catch(err => {
                    this.$Message.error({
                        background: true,
                        content: err
                    })
                }).finally(() => {
                    // remove loading.
                    msg();
                })
        },
        signupAsync() {
            const msg = this.$Message.loading({
                content: 'Sign up...',
                duration: 0
            });
            const mutation = gql`
                mutation signup {
                    signup(input: {
                        username: "${this.username}", 
                        password: "${this.password}"
                    }) {
                        status
                        message
                    }
                }
            `
            return Client.mutate({mutation})
                .then(res => {
                    if(res.data.signup.status){
                        this.$Message.success({
                            background: true,
                            content: res.data.signup.message
                        });
                    }
                    else{
                        this.$Message.error({
                            background: true,
                            content: res.data.signup.message
                        })
                    }
                })
                .catch(err => {
                    this.$Message.error({
                        background: true,
                        content: err
                    });
                })
                .finally(() => {
                    // remove loading.
                    msg();
                })
        },
    },
}
</script>

<style scoped>
#sign{
    min-height: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#card{
    width: 500px; 
    height: 300px;
    font-size: 16px; 
}
</style>
