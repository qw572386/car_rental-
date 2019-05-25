window.onload = function () {
  // register continueSelect button event.
  document.getElementById('continueSelect').onclick = function() {
    window.location.replace('/')
  }

  // render total
  let total = 0;
  const cart = JSON.parse(window.sessionStorage.getItem('cart')) || [];
  for (let i = 0; i < cart.length; i++) {
    total += Number(cart[i].days) * Number(cart[i].priceperday)
  }
  document.getElementById('total').innerHTML = total;
  // define trim method.
  const  trim = function (s){
      return s.replace(/(^\s*)|(\s*$)/g, "");
  }
  // register Booking button event.
  document.getElementById('booking').onclick = function() {
    if (!trim(document.getElementById('firstName').value)) {
      alert('First Name is required');
      return;
    }
    if (!trim(document.getElementById('lastName').value)) {
      alert('Last Name is required');
      return;
    }
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const emailAddress = trim(document.getElementById('email').value);
    if (!reg.test(emailAddress)) {
      alert('Email address format error');
      return;
    }
    if (!trim(document.getElementById('address').value)) {
      alert('Address Line 1 is required');
      return;
    }
    if (!trim(document.getElementById('city').value)) {
      alert('City is required');
      return;
    }
    if (!trim(document.getElementById('state').value)) {
      alert('State is required');
      return;
    }
    if (!trim(document.getElementById('postCode').value)) {
      alert('Post Code is required');
      return;
    }
    if (!trim(document.getElementById('payment').value)) {
      alert('Payment Type is required');
      return;
    }
    booking(emailAddress, cart, total);
  }
}
// send ajax to booking. 
function booking(emailAddress, cart, total) {
  const xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function() {
    if (xHttp.readyState === 4 && xHttp.status === 200) {
      const res = JSON.parse(xHttp.response);
      if (res.code == 0) {
        alert('Booking successed, please check your email later.');
        window.sessionStorage.clear();
        window.location.href = '/';
      }
    };
  };
  xHttp.open('POST', 'http://127.0.0.1:3000/order', true);
  xHttp.setRequestHeader('Content-type', 'application/json');
  const params = {
    "email": emailAddress,
    "cars": cart,
    "total": total
  }
  // xHttp.send('email=' + emailAddress + '&cars=' + cart + '&total=' + total);
  xHttp.send(JSON.stringify(params));
}