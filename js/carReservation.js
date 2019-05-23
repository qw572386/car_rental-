window.onload = function () {
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
      if (carReservation[i] == carList[j].carid) {
        cart.push(carList[j]);
        break;
      }
    }
  }
  let strHtml = '';
  for (let i = 0; i < cart.length; i++) {
    strHtml += '<tr>' +
    '  <td>' +
    '    <img src="../images/' + cart[i].model + '.png" alt="">' +
    '  </td>' +
    '  <td>'+ cart[i].modelyear +'-'+ cart[i].brand +'-'+ cart[i].model +'</td>' +
    '  <td>'+ cart[i].priceperday +'</td>' +
    '  <td>' +
    '    <input type="number" value="1" class="rentalDays"/>' +
    '  </td>' +
    '  <td>' +
    '    <button class="btn-link deleteCar" onClick="deleteCar(this,' + cart[i].carid + ')">Delete</button>' +
    '  </td>' +
    '</tr>';
  }
  // render cart DOM
  document.getElementById('cartBody').innerHTML = strHtml;
}
function deleteCar(elem, carid) {
  elem.parentNode.parentNode.remove();
  const carReservation = JSON.parse(window.sessionStorage.getItem('carReservation'));
  const index = carReservation.indexOf(carid);
  if (index !== -1) {
    carReservation.splice(index, 1);
    window.sessionStorage.setItem('carReservation', JSON.stringify(carReservation));
  }
}