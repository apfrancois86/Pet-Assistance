function Search() {
}

Search.prototype.getPets = function(type, gender, age, size, displayPets) {
  this.type = type;
  this.gender = gender;
  this.age = age;
  this.size = size;
  $.getJSON('http://api.petfinder.com/pet.find?key=698dc78a377d9f860f2aef7bf68b2855&location=97212&animal='+type+'&size='+size+'&sex='+gender+ '&age='+age+'&count=100&format=json&callback=?')
  .then(function(petApiData) {
    console.log(petApiData);
    displayPets(petApiData);
  })
  .fail(function(error){
    console.log("fail");
  });
};

var displayPetInfo = function(searchResults) {
  for(var i =0; i<searchResults.petfinder.pets.pet.length; i++){
    if (searchResults.petfinder.pets.pet[i].contact.email.$t === undefined || searchResults.petfinder.pets.pet[i].contact.phone.$t=== undefined) {
      $('.results').append('<div class="petResults">'+ '<h2>' + searchResults.petfinder.pets.pet[i].name.$t + '</h2>' + '<img class="petImage" src=' + searchResults.petfinder.pets.pet[i].media.photos.photo[2].$t + '>' + '<li>' + searchResults.petfinder.pets.pet[i].description.$t + '</li>' + '</div>');
    } else {
      $('.results').append('<div class="petResults">'+ '<h2>' + searchResults.petfinder.pets.pet[i].name.$t + '</h2>' + '<img class="petImage" src=' + searchResults.petfinder.pets.pet[i].media.photos.photo[2].$t + '>' + '<li>' + searchResults.petfinder.pets.pet[i].description.$t + '</li>'+  '<li>' + searchResults.petfinder.pets.pet[i].contact.email.$t + '</li>' + '<li>' + searchResults.petfinder.pets.pet[i].contact.phone.$t + '</li>'+ '</div>');
    }
  }
};

$(document).ready(function(){
  $(".top-scroll").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $(".small").click(function(event){
    event.preventDefault();
    $(".menu").toggle();
  });
  $(".logo").click(function(event){
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  $(".petFind").submit(function(event){
    event.preventDefault();
    $('.petfinder-container').hide();
    $('.results').show();
    var petType = $('#type').val();
    var petGender = $('#gender').val();
    var petAge = $('#age').val();
    var petSize = $('#size').val();
    var currentSearch = new Search();
    currentSearch.getPets(petType, petGender, petAge, petSize, displayPetInfo);
  });
});
