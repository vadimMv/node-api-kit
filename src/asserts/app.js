'use strict';
window.addEventListener('load', function () {
  let form = document.querySelector('#createUser');
  if (form) {
    const data = {
      form,
      uri: 'http://localhost:3000/user',
      method: 'POST',
      message: "Failed signup",
      redirect: '/account/all'
    }
    AjaxForm(data);
  }
  let loginForm = document.querySelector('#loginUser');
  if (loginForm) {
    console.log(loginForm.elements.id.value)
    const data = {
      form: loginForm,
      uri: `http://localhost:3000/user`,
      method: 'GET',
      message: "Failed login",
      redirect: '/account/all'
    }
    AjaxForm(data);
  }
});



const AjaxForm = (data) => {
  const { form, uri, method, message, redirect } = data;
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    errorMessage(form);
    const data = {};
    let queryString = ''
    for (const el of form.elements) {
      data[el.id] = el.value;
    }
    const requestOptions = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    if (["GET", "DELETE"].includes(method)) {
      delete requestOptions.body;
      Object.keys(data).map((v, i) => {
        i === 0 ? queryString += `?${v}=${data[v]}` : queryString += `&${v}=${data[v]}`;
      });
    }
    try {
      const response = await fetch(uri + queryString, requestOptions);
      let data = await response.json();
      if (data.tokenID) {
        localStorage.setItem('tokenID', data.tokenID);
        redirectTo(redirect + `?tokenId=${data.tokenID}`);
      }

    }
    catch (e) {
      console.log(e)
      errorMessage(form, message, 'block');
    }
  });
  const redirectTo = (loc) => window.location = loc;
  const errorMessage = (form, message = '', display = 'none') => {
    if (form.querySelector('.formError')) {
      form.querySelector('.formError').style.display = display;
      form.querySelector('.formError').innerHTML = message;
    }

  }
};


const CallApi = async data => {
  const { uri, request } = data;
  try {
    const response = await fetch(uri, request);
    return await response.json();
  }
  catch (e) {
    console.log(e);
    return undefined;
  }
}