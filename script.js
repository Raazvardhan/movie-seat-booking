const container = document.querySelector('.container');
const seats =document.querySelectorAll('.row .seat:not(.occupide)'); 
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();







let ticketprice= +movieSelect.value;

//save selected movie and price4
function setMovieData(movieIndex,moviePrice){
 localStorage.setItem('selectedMovieIndex',movieIndex);
 localStorage.setItem('selectedPrice',moviePrice);
}




function updatSelectedCount()
{
  const selectedSeat = document.querySelectorAll('.row .seat.selected');

  //store the data
  const seatsIndex = [...selectedSeat].map( seat => {
  
    return[...seats].indexOf(seat);
});

localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))


// update total and count
  const selectedSeatCount =selectedSeat.length;


  count.innerText =selectedSeatCount;
  total.innerText =selectedSeatCount * ticketprice;
}
//get data from local storage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie  update
movieSelect.addEventListener('change', e => {
  ticketprice =+e.target.value;
  setMovieData(e.target.seatsIndex, e.target.value);//save the selected movie
  updatSelectedCount();
})



// even on click
container.addEventListener('click', e => {
  if(
    e.target.classList.contains('seat') && !e.target.classList.contains('occupide')
  ){
    e.target.classList.toggle('selected');
    updatSelectedCount();
  }
})

//initals count and total set
updatSelectedCount();