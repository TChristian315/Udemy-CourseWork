// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    // Hide results
    document.getElementById('results').style.display = 'none';
    
    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results Function
function calculateResults(){

    // UI Vars
    const Jamount = document.getElementById('amount');
    const Jinterest = document.getElementById('interest');
    const Jyears = document.getElementById('years');
    const JmonthlyPayment = document.getElementById('monthly-payment');
    const JtotalPayment = document.getElementById('total-payment');
    const JtotalInterest = document.getElementById('total-interest');
    
    const principal = parseFloat(Jamount.value);
    const calculatedInterest = parseFloat(Jinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(Jyears.value) * 12;
    
    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        JmonthlyPayment.value = monthly.toFixed(2);
        JtotalPayment.value = (monthly*calculatedPayments).toFixed(2);
        JtotalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

        // Hide Results
        document.getElementById('results').style.display = 'block';
        
        // Hide Loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your numbers');
    }
}

function showError(error){
    // Hide Results
    document.getElementById('results').style.display = 'none';
        
    // Hide Loader
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}




