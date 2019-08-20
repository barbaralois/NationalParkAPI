'use strict';

let apiKey = "utBmSkbBzsf6fw1WC3bgQsTd5xQC4ccQADm1GKdM";

function getParks() {
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=`+$('#input-state').val()+`&limit=`+$('#input-results').val()+`&api_key=`+apiKey)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  if (responseJson.total === '0') {
    alert('No parks found. Please check your state code and try again!');
  } else {
    for (let i=0; i<responseJson.data.length; i++) {
      let name = responseJson.data[i].fullName;
      let desc = responseJson.data[i].description;
      let url = responseJson.data[i].url;
      $('#results-list').append(`<li><h3><a href="${url}" target="_blank">${name}</a></h3><p>${desc}</li>`)
    }
  }
  $("#results").removeClass('hidden');
}

function formSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    getParks();
  });
}

$(formSubmit());