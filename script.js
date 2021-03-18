var alternativ = []

function randomNumber(min, max)
{
  // Returns a random integer between the integers min and max. Max not included.
  // Example: randomNumber(3, 6) will return 3, 4 or 5.
  return min + Math.floor((max - min) * Math.random())
}



$('#decide').on('click', function(){

  let rN = randomNumber(0,alternativ.length);
    
  $('#decision').empty()
  $('#decision').html(alternativ[rN])
   
})

$('body').on('click', function(){
  if ($('#inputFalt').val() == ''){
    $('#inputFalt').val('What are your options?')
  }
})

$(document).on('click', '#inputFalt', function(){
  $(this).val('')
})

$(document).on('keyup', '#inputFalt', function(event){
  if(event.key === 'Enter'){
    addOptions()
  }
})

$(document).on('click', '#submit', addOptions)

$(document).on('click', '#startOver', function(){

  alternativ.length = 0

  $('#startWindow').remove()
  
  nyaAlternativ()

  console.log(alternativ)
})

$(document).on('click', '#done', function(){

  let nyttAlternativ = $('#inputFalt').val()

  if (alternativ.length > 1){
    $('h1').remove()

    if(nyttAlternativ != 'What else?' && nyttAlternativ != 'What are your options?' && nyttAlternativ != ''){
    alternativ.push(nyttAlternativ)
    }
    console.log(alternativ)
    $('#startWindow').remove()
    $('#decision').html('...')
  }else{
    $('#hasBeenAdded').remove()
    let nDiv = $(`<div id='hasBeenAdded'>`).html('You need more options')
    $('#startWindow').prepend(nDiv)
    setTimeout(function(){
    $('#hasBeenAdded').remove()
    },3000)

  }

})

$('#addMore').on('click', function(){
  nyaAlternativ()
  $('#done').removeAttr('disabled').addClass('knappar')

})

function nyaAlternativ(){
  $('body').append($(`<div id='startWindow'>`))
  $('body').prepend($(`<h1>Let's Decide!</h1>`))
  $('#startWindow').append($(`<div id='decisionBox'>`))
  $(`#decisionBox`).append($(`<input id='inputFalt'>`))
  $('#decisionBox').append($(`<button id='submit'>`))

  $('#inputFalt').val('What are your options?')

  $('#submit').html('add more')

  $('#startWindow').append($(`<div id='goOn'>`))

  $('#goOn').append($(`<button id='done'>`))
  $('#goOn').append($(`<button id='startOver' class='knappar'>`))
  $('#done').html(`Let's decide...`)
  $('#startOver').html('Start over.')

  $('#done').attr('disabled', 'disabled').removeClass('knappar')
  
}

function addOptions(){
  let nyttAlternativ = $('#inputFalt').val();

  $('#hasBeenAdded').remove()

  if(nyttAlternativ != 'What else?' && nyttAlternativ != 'What are your options?'){
    alternativ.push(nyttAlternativ)
    $('#inputFalt').val('What else?');
  }else{
    $('#inputFalt').val('What are your options?')
  }

  if(alternativ.length > 1){
    $('#done').removeAttr('disabled').addClass('knappar');
  }

  let nDiv = $(`<div id='hasBeenAdded'>`).html(nyttAlternativ+' ' + 'has been added')
  $('#startWindow').prepend(nDiv)
  setTimeout(function(){
    $('#hasBeenAdded').remove()
  },3000)

  console.log(alternativ);
}

nyaAlternativ()