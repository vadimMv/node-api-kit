'use strict';
window.addEventListener('load', async function () {
    if (localStorage.getItem('tokenID')) {
        const requestData = {
            uri: 'http://localhost:3000/api/list',
            request: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'tokenID': localStorage.getItem('tokenID'),
                }
            }
        };
        const data = await CallApi(requestData);
        const table = document.querySelector('#checksListTable');
        for (const r of data.list) {
            let i = 0;
            let row = table.insertRow();
            for (let item in r) {
                row.insertCell(i++).innerHTML = r[item] === true ? "yes" : r[item] === false ? "no" : r[item];
            }
            row.insertCell(i++).innerHTML = `<button class="cta green" data-toggle="modal" data-target="#payment" id=${r.id}>Buy</button>`;
        }
        const buttons = document.querySelectorAll('.cta.green');
        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const form = document.querySelector('.modal-form');
                const id = parseInt(event.target.id);
                const currentRow = data.list.filter(row => row.id === id)[0];
                form.elements.name.value = currentRow.name;
                form.elements.vegan.value = currentRow.isVegan ? 'yes ' : 'no';
                form.elements.price.value = currentRow.priceUs;
                document.querySelector('.submit')
                .addEventListener('click', async function (event) {
                    const data = {};
                    for (const el of form.elements) {
                        data[el.id] = el.value;
                    }
                    const requestData = {
                        uri: 'http://localhost:3000/api/order',
                        request: {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json',
                                'tokenID': localStorage.getItem('tokenID'),
                            }
                        }
                    };
                    const rez = await CallApi(requestData);
                });
            });
        });
    }
});