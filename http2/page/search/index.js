import Client from '../index';
import gql from '../node_modules/graphql-tag';

window.onload = () => {
    const searchBtn = document.getElementById('search'),
        query = document.getElementById('query'),
        clearBtns = document.getElementsByClassName('clear'),
        tip = document.getElementById('tip');

    searchBtn.addEventListener('click', () => {
        generateTip(searchAsync(query.value))
    })

    ([...clearBtns]).forEach(clearBtn => {
        clearBtn.addEventListener('click', () => {
            clearBtn.previousElementSibling.value = '';
        })
    });

    function searchAsync(queryInput) {
        const query = gql`
            query search {
                search(query: "${queryInput}"){
                    res{
                        content
                        link
                    }
                    status
                    message
                }
            }
        `

        return Client.query({query})
            .then(res => res.data.search)
            .catch(err => ({
                res: [],
                status: false,
                message: 'Please login in firstly.'
            }))
    }

    function generateTip(promise){
        return promise.then(res => {
            tip.classList.remove('correctTip')
            tip.classList.remove('wrongTip')
            tip.classList.add(res.status ? 'correctTip' : 'wrongTip')
            tip.innerHTML = res.message;

            console.log(res)
        }).catch(err => {
            console.error(err);
        })
    }
}