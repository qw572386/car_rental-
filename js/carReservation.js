window.onload = function () {
  const init  = function () {
    // get car reservation infos from session.
    const carReservation = JSON.parse(window.sessionStorage.getItem('carReservation'));
    // get all cars from session.
    const carList = JSON.parse(window.sessionStorage.getItem('carList'));
    // get the cart infos.
    const cart = [];
    if (!carReservation || !carList) {
      return;
    }
    for (let i = 0; i < carReservation.length; i++) {
      for (let j = 0; j < carList.length; j++) {
        if (carReservation[i].carid == carList[j].carid) {
          carList[j].days = carReservation[i].days;
          cart.push(carList[j]);
          break;
        }
      }
    }
    window.sessionStorage.setItem('cart', JSON.stringify(cart));
    let strHtml = '';
    for (let i = 0; i < cart.length; i++) {
      strHtml += '<tr>' +
      '  <td>' +
      '    <img src="../images/' + cart[i].model + '.png" alt="">' +
      '  </td>' +
      '  <td>'+ cart[i].modelyear +'-'+ cart[i].brand +'-'+ cart[i].model +'</td>' +
      '  <td>'+ cart[i].priceperday +'</td>' +
      '  <td>' +
      '    <input type="number" value="' + cart[i].days + '" class="rentalDays" onchange="changeDays(this,' + cart[i].carid + ')" />' +
      '  </td>' +
      '  <td>' +
      '    <button class="btn-link deleteCar" onClick="deleteCar(this,' + cart[i].carid + ')">Delete</button>' +
      '  </td>' +
      '</tr>';
    }
    // render cart DOM
    document.getElementById('cartBody').innerHTML = strHtml;
  };
  // init page
  init();

  // register Proceeding to CheckOut button event.
  document.getElementById('proceedToCheckOut').onclick = function() {
    const cart = JSON.parse(window.sessionStorage.getItem('cart')) || [];
    if (!cart || !cart.length) {
      alert('No car has been reserved.');
      window.location.href = '/';
      return;
    }
    for (let i = 0; i < cart.length; i++) {
      if (isNaN(Number(cart[i].days)) || Number(cart[i].days) < 1) {
        alert('rental days must be integer and greater than zero');
        return;
      }
    }
    window.location.href = './checkOut.html';
  }
}
// remove from cart
function deleteCar(elem, carid) {
  elem.parentNode.parentNode.remove();
  const carReservation = JSON.parse(window.sessionStorage.getItem('carReservation'));
  const cart = JSON.parse(window.sessionStorage.getItem('cart'));
  let index = -1;
  for (let i = 0; i < carReservation.length; i++) {
    if (carid == carReservation[i].carid) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    carReservation.splice(index, 1);
    window.sessionStorage.setItem('carReservation', JSON.stringify(carReservation));
    cart.splice(index, 1);
    window.sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
// change rental days
function changeDays(elem, carid) {
  const carReservation = JSON.parse(window.sessionStorage.getItem('carReservation'));
  for (let i = 0; i < carReservation.length; i++) {
    if (carid == carReservation[i].carid) {
      carReservation[i].days = Number(elem.value);
      break;
    }
  }
  window.sessionStorage.setItem('carReservation', JSON.stringify(carReservation));
  const cart = JSON.parse(window.sessionStorage.getItem('cart'));
  for (let i = 0; i < cart.length; i++) {
    if (carid == cart[i].carid) {
      cart[i].days = Number(elem.value);
      break;
    }
  }
  window.sessionStorage.setItem('cart', JSON.stringify(cart));
}