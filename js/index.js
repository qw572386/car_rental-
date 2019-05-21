window.onload = function() {
  // define a render DOM method
  const renderCarsInfo = function(xml) {
    const xmlDoc = xml.responseXML;
    const cars = xmlDoc.getElementsByTagName('car');
    let strHtml = '';
    for(let i = 0; i < cars.length; i++) {
      const brand = cars[i].getElementsByTagName('brand')[0].childNodes[0].nodeValue;
      const model = cars[i].getElementsByTagName('model')[0].childNodes[0].nodeValue;
      const modelyear = cars[i].getElementsByTagName('modelyear')[0].childNodes[0].nodeValue;
      strHtml += '<div class="card">' +
      '              <div class="card-body">' +
      '                 <div class="card-image"><img class="card-image" src=".\/images\/'+ model +'.png" /></div>' +
      '                 <div class="card-info">' +
      '                     <h2 class="car-title">'+ brand +'-'+ model +'-'+ modelyear +'</h2>' +
      '                     <div class="car-info"><b>mileage: </b>'+ cars[i].getElementsByTagName('mileage')[0].childNodes[0].nodeValue +'kms</div>' +
      '                     <div class="car-info"><b>fuel_type: </b>'+ cars[i].getElementsByTagName('fueltype')[0].childNodes[0].nodeValue +'</div>' +
      '                     <div class="car-info"><b>seats: </b>'+ cars[i].getElementsByTagName('seats')[0].childNodes[0].nodeValue +'</div>' +
      '                     <div class="car-info"><b>price_per_day: </b>'+ cars[i].getElementsByTagName('priceperday')[0].childNodes[0].nodeValue +'</div>' +
      '                     <div class="car-info"><b>availability: </b>'+ cars[i].getElementsByTagName('availability')[0].childNodes[0].nodeValue +'</div>' +
      '                     <p class="car-info"><b>description: </b>'+ cars[i].getElementsByTagName('description')[0].childNodes[0].nodeValue +'</p>' +
      '                     <button class="btn-Add-To-Cart">Add to cart</button>' +
      '                 </div>' +
      '              </div>' +
      '          </div>';
    };
    document.getElementById('section').innerHTML = strHtml;
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
  loadXMLDoc();
}