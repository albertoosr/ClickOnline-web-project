$(function(){
// navbar
var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
          nav.classList.add('bg-dark', 'shadow');
        } else {
          nav.classList.remove('bg-dark', 'shadow');
        }
});

//alert
$(document).ready(function(){
  $('.toast').toast('show');
});

//validación login
window.addEventListener(
  'load',
  function () {
    var forms = document.getElementsByClassName('js-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
          
        },
        false
      );
    });
  },
  false
);



});

