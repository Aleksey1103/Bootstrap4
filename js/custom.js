'use strict'

const toggleVisibility = function(elementClassName, toggler) {

    const toggleTo =  function() {
        let pageOffset = window.pageYOffset;

        if (pageOffset > toggler) {
            document.querySelector(elementClassName).style.display = "block";                
        } else {
            document.querySelector(elementClassName).style.display = "none";
        }
    };

    document.addEventListener("scroll", toggleTo);
};

const smoothScroll = function(linksClassName, time, offset = 0) {

    const moveTo = function(event) {
        
        event.preventDefault();

        let id = event.target.getAttribute('href'),                    
            startPos =  window.pageYOffset,                
            endPos = document.querySelector(id).offsetTop,                
            distance = endPos - startPos + offset,
            maxDistance = document.body.clientHeight - window.innerHeight,
            step = 0;

        distance = ( distance < maxDistance ) ? distance : maxDistance;

        const stepTo = function() {
            if ( step == 100 ) {                        
                clearInterval(timeId);

            } else {
                startPos += distance / 100;
                window.scrollTo(0, startPos);
                step++;
            }                    
        }

        let timeId = setInterval( stepTo, (time / 100) );
    };

    let navLincks = document.querySelectorAll(linksClassName);

    for (let item of navLincks) {
        item.addEventListener('click', moveTo);
    }
};