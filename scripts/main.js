
$(document).ready(function(){

    'use strict';

    const navMenu = document.querySelector('.nav');
    const msgErr = document.querySelector('.message-error');
    const form = $('#form');

    //     Menu button click
    $('.menu-button').on('click', function(event){

        event.preventDefault();
        navMenu.style.right = '0';
        event.stopPropagation();
    });

    // Button Close click

    $('.link-close').on('click', function(event){
        event.preventDefault();
        navMenu.style.right = '-178px';
        event.stopPropagation();
    });

    // Phone Mask validation
    let options =  {
        onComplete: function(phone) {

            console.log('PHONE Completed!:' + phone);
        },
        onChange: function(phone){
            //console.log('phone changed! ', phone);

        }
    };

    $('#phone').mask('+999(99)999-99-99', options);

    // Hide
    $( ".form-thanks" ).hide();

    // Form validation

    form.parsley().on('form:submit', function(form) {

        console.log('form submitted: ' + form.validationResult);

        const inputs = form.fields;
        let data = [];

        for (let input of inputs) {
            data.push(input.value)
        }

        // Show loader
        const loader = loaderShow('.loader');

        // Send POST Request
        $.ajax({
            method: "POST",
            url:  "https://testologia.ru/checkout",
            data: {
                'product': data[0],
                'name': data[1],
                'phone': data[2]
            },
            dataType: 'json',
            })
            .done(function( jsonObject ) {

                console.log(jsonObject.success);

                if (jsonObject.success) {

                    // Clear fields
                    let inEls = $('#form').find('input');

                    for (let input of inEls) {
                        input.value = '';
                    }

                    // Hide Form
                    $( "#form" ).hide( 'fade', 1000, callbackEffect );

                }

                setTimeout(function() {
                    loaderHide(loader);

                    if (!jsonObject.success) {
                        msgErr.classList.toggle('hidden');
                    }

                }, 500)
            });

        return false;
    });

    function callbackEffect() {
        setTimeout(function() {

            $( ".form-thanks" ).show( 'slide', 500);

        }, 1000 );
    }

    form.on('input', function(event) {

       msgErrHide();
    });

    function msgErrHide () {

        if (!msgErr.classList.contains('hidden')) {
            msgErr.classList.add('hidden');
        }
    }
    // Buttons order

    $('.products__list').on('click', function(e){

        if (e.target.nodeName === 'A') {

            let macaroonName = e.target.parentElement.previousElementSibling.textContent;

            msgErrHide();
            $('#choice').val(macaroonName);
            $( ".form-thanks" ).hide();
            $( "#form" ).show();

        }
        else {
            e.preventDefault();
        }

        e.stopPropagation();
    });
});