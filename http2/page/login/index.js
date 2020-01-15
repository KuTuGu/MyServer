import Client from '../index';
import gql from '../node_modules/graphql-tag';

window.onload = () => {
    const loginBtn = document.getElementById('login'),
        signupBtn = document.getElementById('signup'),
        username = document.getElementById('username'),
        password = document.getElementById('password'),
        clearBtns = document.getElementsByClassName('clear'),
        tip = document.getElementById('tip');

    loginBtn.addEventListener('click', () => {
        generateTip(loginAsync(username.value, password.value)).then(token => {
            localStorage.setItem('token', token);
        })
    })
    signupBtn.addEventListener('click', () => {
        generateTip(signupAsync(username.value, password.value))
    })

    ([...clearBtns]).forEach(clearBtn => {
        clearBtn.addEventListener('click', () => {
            clearBtn.previousElementSibling.value = '';
        })
    });

    function loginAsync(username, password) {
        const query = gql`
            query login {
                login(input: {
                    username: "${username}", 
                    password: "${password}"
                }){
                    status
                    message
                    token
                }
            }
        `

        return Client.query({query}).then(res => res.data.login)
    }

    function signupAsync(username, password) {
        const mutation = gql`
            mutation signup {
                signup(input: {
                    username: "${username}", 
                    password: "${password}"
                }) {
                    status
                    message
                }
            }
        `
        return Client.mutate({mutation}).then(res => res.data.signup)
    }

    function generateTip(promise){
        return promise.then(res => {
            tip.classList.remove('correctTip')
            tip.classList.remove('wrongTip')
            tip.classList.add(res.status ? 'correctTip' : 'wrongTip')
            tip.innerHTML = res.message;

            return res.token;
        }).catch(err => {
            console.error(err);
        })
    }
}