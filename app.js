// GETTING THE FORM ID
const form = document.querySelector('#loan-form');
// LISTENE FOR EVENT LISTENER
form.addEventListener('submit', function (e){
  // Hide Results
  const  result = document.querySelector('#results');
  result.style.display = 'none'; 
  // SHOW LOADER DELAY WHEN calculateResults is Called
  const loader = document.querySelector('#loading');
  loader.style.display = 'block';

  setTimeout(calculateResult, 2000);

    e.preventDefault();
});
// CREATE A FUNCTION FOR CAL RESULT
function calculateResult(){
  // console.log(form)
  // COLLECTING UI VARS FROM INDEX HTML

  const UIamount = document.querySelector('#amount');
  const UIinterest = document.querySelector('#interest');
  const UIyears = document.querySelector('#years');
  const UImonthlyPayment = document.querySelector('#monthly-payment');
  const UItotalPayment = document.querySelector('#total-payment');
  const UItotalInterest = document.querySelector('#total-interest');

  // ITEMIZING VARIABLE CALCULATIONS
  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayment = parseFloat(UIyears.value) * 12;


  // COMPUTING MONTHLY PAYMENT
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayment).toFixed(2);
    UItotalInterest.value = ((monthly* calculatedPayment)-principal).toFixed(2);

    const  result = document.querySelector('#results');
    result.style.display = 'block'; 
    // HIDE LOADER WHEN calculateResults is Called
    const loader = document.querySelector('#loading');
    loader.style.display = 'none';

  } else {
    showError('Please Check Your Number');
  }

}

  // SHOW ERROR FUNCTION
    function showError(error){

      const  result = document.querySelector('#results');
      result.style.display = 'none'; 
      // SHOW LOADER DELAY WHEN calculateResults is Called
      const loader = document.querySelector('#loading');
      loader.style.display = 'none';

        // Grabing Element From the DOM

        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');
  

      // creating a div that will handle the error function 
      const errDiv = document.createElement('div');
      // creating a class for the div
      errDiv.className = 'alert alert-danger';
      // Create Text Node
      errDiv.appendChild(document.createTextNode(error));
      
      // inserting error above heading
      card.insertBefore(errDiv, heading);

      // Set error Timeout
      setTimeout(clearError, 3000); 
    }

    // ERROR TIMEOUT FUNCTION
    function clearError(){
      document.querySelector('.alert').remove();
    }