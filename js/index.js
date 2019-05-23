window.onload = function() {
  // define a render DOM method
  const renderCarsInfo = function(xml) {
    const xmlDoc = xml.responseXML;
    const cars = xmlDoc.getElementsByTagName('car');
    let strHtml = '';
    const carsList = [];
    for(let i = 0; i < cars.length; i++) {
      const brand = cars[i].getElementsByTagName('brand')[0].childNodes[0].nodeValue;
      const model = cars[i].getElementsByTagName('model')[0].childNodes[0].nodeValue;
      const modelyear = cars[i].getElementsByTagName('modelyear')[0].childNodes[0].nodeValue;
      const mileage = cars[i].getElementsByTagName('mileage')[0].childNodes[0].nodeValue;
      const fueltype = cars[i].getElementsByTagName('fueltype')[0].childNodes[0].nodeValue;
      const seats = cars[i].getElementsByTagName('seats')[0].childNodes[0].nodeValue;
      const priceperday = cars[i].getElementsByTagName('priceperday')[0].childNodes[0].nodeValue;
      const availability = cars[i].getElementsByTagName('availability')[0].childNodes[0].nodeValue;
      const description = cars[i].getElementsByTagName('description')[0].childNodes[0].nodeValue;
      const carid = Number(cars[i].getElementsByTagName('carid')[0].childNodes[0].nodeValue);
      const category = cars[i].getElementsByTagName('category')[0].childNodes[0].nodeValue;
      carsList.push({
        brand: brand,
        model: model,
        modelyear: modelyear,
        mileage: mileage,
        fueltype: fueltype,
        seats: seats,
        priceperday: priceperday,
        availability: availability,
        description: description,
        carid: carid,
        category: category
      })
      strHtml += '<div class="card">' +
      '              <div class="card-body">' +
      '                 <div class="card-image"><img class="card-image" src=".\/images\/'+ model +'.png" /></div>' +
      '                 <div class="card-info">' +
      '                     <h2 class="car-title">'+ brand +'-'+ model +'-'+ modelyear +'</h2>' +
      '                     <div class="car-info"><b>mileage: </b>'+ mileage +'kms</div>' +
      '                     <div class="car-info"><b>fuel_type: </b>'+ fueltype +'</div>' +
      '                     <div class="car-info"><b>seats: </b>'+ seats +'</div>' +
      '                     <div class="car-info"><b>price_per_day: </b>'+ priceperday +'</div>' +
      '                     <div class="car-info"><b>availability: </b>'+ availability +'</div>' +
      '                     <p class="car-info"><b>description: </b>'+ description +'</p>' +
      '                     <button class="btn-Add-To-Cart" onclick="addToCart(' + carid + ')">Add to cart</button>' +
      '                 </div>' +
      '              </div>' +
      '          </div>';
    };
    document.getElementById('section').innerHTML = strHtml;
    window.sessionStorage.setItem('carList', JSON.stringify(carsList));
  }
  // define a ajax method of load cars.xml
  const loadXMLDoc = function() {
    const xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        renderCarsInfo(this);
      }
    };
    xHttp.open('GET', './data/cars.xml', true);
    xHttp.send();
  };
  // send ajax to get cars.xml and render DOM
  loadXMLDoc();

  
}
// add to cart
function addToCart(carid) {
  const xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function() {
    if (xHttp.readyState === 4 && xHttp.status === 200) {
      const resXml = this.responseXML;
      const cars = resXml.getElementsByTagName('car');
      let isAvailability;
      for (let i = 0; i < cars.length; i++) {
        if (carid == cars[i].getElementsByTagName('carid')[0].childNodes[0].nodeValue) {
          isAvailability = cars[i].getElementsByTagName('availability')[0].childNodes[0].nodeValue
          break;
        }
      }
      if (isAvailability != 'True') {
        alert('Sorry, the car is not available now. Please try other cars');
        return;
      }
      alert('Add to the cart successfully.');
      const carReservation = JSON.parse(window.sessionStorage.getItem('carReservation'));
      if (!carReservation) {
        window.sessionStorage.setItem('carReservation', JSON.stringify([carid]));
        return;
      }
      carReservation.push(carid);
      window.sessionStorage.setItem('carReservation', JSON.stringify(carReservation));
    }
  }
  xHttp.open('GET', './data/cars.xml', true);
  xHttp.send();
}