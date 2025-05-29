
function loaderShow(loader) {

    const ld = document.querySelector(loader);

    if (ld.classList.contains('ld-hide')) {
        ld.classList.remove('ld-hide');
        ld.classList.add('ld-show');
    }

    return ld;
}

function loaderHide(loaderElement) {

    loaderElement.classList.remove('ld-show');
    loaderElement.classList.add('ld-hide');
}