

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//array of location
var AbhaCenters=[
    {
       position:{lat:18.214454926349504,lng: 42.49875099955248},
       title:'Abha Station'
    }
 ]
 var DammamCenters =[
    {
       position:{lat:26.383773288623935,lng:50.120080487758386},
       title:'Dammam Station'
    }
 ]
  
 var JeddahCenters =[
     { 
        position:{lat:22.51267671939449,lng: 39.801214573758486},
        title:'Makkah Station'
    },
    { 
       position:{lat:21.501382112155294, lng:39.25468133203821},
       title:'Jeddah Station'}
    ];
var RiyadhtestCenters = [
    {
        position:{lat:24.829711599593548,lng:46.72418804546476}, 
        title:'Riyadh Airport Station'
    },
    {
       position:{lat:24.66228732272091,lng:46.73805874608075}, 
       title:'Al Malaz Station'
    },
    {
       position:{lat:24.630921484338096,lng:46.78351730314091}, 
       title:'Riyadh South Station'
    },
    {
       position:{lat:24.11672279387588,lng:47.25555081664364}, 
       title:'Al Kharj Station'
    }
    ];
    
    function initMap(){
     const map = new google.maps.Map(document.getElementById("map"),{
      center:{lat:24.774265 ,lng:46.738586 },
      zoom:9
    
      });
    
      //array for show markers
    RiyadhtestCenters.forEach(loc=>{
       var marker = new google.maps.Marker({
    
        position:loc.position,
        map:map  ,
        title:loc.title
       });
       //content of show details
       var infowindow = new google.maps.InfoWindow({
        content:loc.title
      });
       //  marker Listener
      marker.addListener("click", () => {
      
        infowindow.open(map,marker);
    
      });
      
    })

      //get current location
      infoWindow = new google.maps.InfoWindow();
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              var marker = new google.maps.Marker({
      
                  position:pos,
                  icon:"http://maps.google.com/mapfiles/kml/pal4/icon57.png",
                  map:map 
                 });
        
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    
       //Polyline
       var line = new google.maps.Polyline({
    
        //locations
        path: [new google.maps.LatLng(24.11672279387588, 47.25555081664364), new google.maps.LatLng(24.630921484338096, 46.78351730314091)],
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        geodesic: true,
        map: map
    });
    
    }