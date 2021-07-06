// DOCS https://www.weatherapi.com/docs
const API_KEY = "e0c15b8e93223e5c828fbf46a5d20e5f"


$(document).ready(function(){

    let selectNumDay = $('#inputDay');

    for(let i = 1; i<=16;i++){
      $('#inputDay').append(`<option>${i}</option>`)
    }

    $('form#enviarForm').submit(function(e) {
        e.preventDefault();
        let dataCiudad = $('#inputCity').val()
        let numDay = $('#inputDay').val()
     
        $.ajax({
            type: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${dataCiudad}&units=metric&lang=es&cnt=${numDay}&appid=${API_KEY}`,
            data: 'JSON',
            encode: true,
          }).done(function(data) {
            let listas = data.list
            for(let i = 0;i<listas.length;i++){
              console.log('Data iterable-->', listas[i].temp.day);
              $('#data').append(`<div class="col-md-3">
              <div class="card bg-light mb-3">
                  <div class="card-header text-uppercase">${listas[i].weather[0].description}</div>
                  <div class="card-body">
                    <h6 class="card-title">Min:${listas[i].temp.min} / Max:${listas[i].temp.max}</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>`)
            }
          })
          .fail(function() {
            console.log( "error" );
          })
          .always(function() {
            console.log( "complete" );
          });;

    });
})