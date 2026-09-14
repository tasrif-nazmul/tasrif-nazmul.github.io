/***********************/
/*       Counter JS    */ 
/***********************/

try {
    // counter
    const counter = document.querySelectorAll('.counter-value');
    const speed = 2500; // The lower the slower

    counter.forEach(counter_value => {
        const updateCount = () => {
            const target = +counter_value.getAttribute('data-target');
            const count = +counter_value.innerText;

            // Lower inc to slow and higher to slow
            var inc = target / speed;

            if (inc < 1) {
                inc = 1;
            }

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter_value
                counter_value.innerText = (count + inc).toFixed(0);
                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter_value.innerText = target;
            }
        };

        updateCount();
    });
} catch (error) {
    
}

/***********************/
/*    Particles JS     */ 
/***********************/
try {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6c757d"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6c757d",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
      }
      
      );
} catch (error) {
    
}

/***********************/
/*     Tobii Js        */ 
/***********************/
try {
    const tobii = new Tobii()
} catch (err) {

}

/***********************/
/*   Portfolio Filter  */
/***********************/
try {
    document.addEventListener('DOMContentLoaded', () => {
        const grid = document.getElementById('grid');
        const options = document.querySelector('.filter-options');
        if (!grid || !options) return;

        const items = Array.from(grid.querySelectorAll('.picture-item'));
        const buttons = Array.from(options.querySelectorAll('[data-group]'));

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const group = button.getAttribute('data-group');

                buttons.forEach((item) => item.classList.remove('active'));
                button.classList.add('active');

                items.forEach((item) => {
                    let groups = [];
                    try {
                        groups = JSON.parse(item.getAttribute('data-groups') || '[]');
                    } catch (e) {
                        groups = [];
                    }

                    const show = group === 'all' || groups.includes(group);
                    item.classList.toggle('portfolio-hidden', !show);
                });
            });
        });
    });
} catch (error) {
}

/***********************/
/*      Contact Form   */ 
/***********************/
try 
{
    function validateForm1() 
    {
        var name = document.forms["myForm"]["name"].value;
        var email = document.forms["myForm"]["email"].value;
        var subject = document.forms["myForm"]["subject"].value;
        var comments = document.forms["myForm"]["comments"].value;
        document.getElementById("error-msg").style.opacity = 0;
        document.getElementById('error-msg').innerHTML = "";
        if (name == "" || name == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
        fadeIn();
        return false;
        }
        if (email == "" || email == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
        fadeIn();
        return false;
        }
        if (subject == "" || subject == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
        fadeIn();
        return false;
        }
        if (comments == "" || comments == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
        fadeIn();
        return false;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("simple-msg").innerHTML = this.responseText;
            document.forms["myForm"]["name"].value = "";
            document.forms["myForm"]["email"].value = "";
            document.forms["myForm"]["subject"].value = "";
            document.forms["myForm"]["comments"].value = "";
        }

        else
        {
            event.preventDefault();
            document.getElementById("error-msg").innerHTML = "Hey! You filled all field";
        }

        };
        // xhttp.open("POST", "php/contact.php", true);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhttp.send("name=" + name + "&email=" + email + "&subject=" + subject + "&comments=" + comments);
        // return false;
    }


  function fadeIn() 
  {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () 
    {
      if (opacity < 1) {
        opacity = opacity + 0.5
        fade.style.opacity = opacity;
      } else {
        clearInterval(intervalID);
      }
    }, 200);
  }
} 

catch (error) 
{
    
}

/***********************/
/*      Tiny Slider    */ 
/***********************/
try {
    //Tiny slider
    var slider = tns({
        container: '.client-review-slider',
        items: 1,
        controls: false,
        slideBy: "page",
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 16,
        responsive: {
            767: {
                items: 2
            }
        },
    });
} catch (error) {
    
}

/***********************/
/*    Switcher Js      */ 
/***********************/
try {
    // Swicher
    function toggleSwitcher() {
        var i = document.getElementById('style-switcher');
        if (i.style.left === "-189px") {
            i.style.left = "0px";
        } else {
            i.style.left = "-189px";
        }
    };

    function setColor(theme) {
        document.getElementById('color-opt').href = './css/colors/' + theme + '.css';
        toggleSwitcher(false);
    };

    function setTheme(theme) {
        document.getElementById('theme-opt').href = './css/' + theme + '.min.css';
        toggleSwitcher(false);
    };
} catch (error) {
    
}

/***********************/
/*     WOW Js          */ 
/***********************/
try {
    new WOW().init();
} catch (error) {
    
}

/***********************/
/*     Ripple Js       */ 
/***********************/
try {
    //Ripples js
    $(home).ripples({
        resolution: 512,
        dropRadius: 15,
        perturbance: 0.01,
    });
} catch (error) {
    
}

/***********************/
/*     Glitch Js       */ 
/***********************/
try {
    $( ".glitch-img" ).mgGlitch({
        destroy : false,
        glitch: true, 
        scale: true, 
        blend : true,
        blendModeType : 'hue',
        glitch1TimeMin : 600,
        glitch1TimeMax : 900,
        glitch2TimeMin : 10,
        glitch2TimeMax : 115,
        zIndexStart : 8,
    });
} catch (error) {
    
}