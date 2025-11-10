
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Luego, forzar scroll al inicio al cargar
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});



// Menú de navegación móvil
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Función de scroll suave mejorada
    function smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 100;
        const duration = 1000; // Duración en ms
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Función de easing para suavizar la animación
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Manejador de clicks
    document.addEventListener('click', function (e) {
        // Para enlaces con clase smooth-scroll
        if (e.target.classList.contains('smooth-scroll')) {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            smoothScroll(target);

            // Actualizar URL sin recargar
            history.pushState(null, null, target);
        }
    });

    // Manejar scroll al cargar página con hash
    if (window.location.hash) {
        setTimeout(() => {
            smoothScroll(window.location.hash);
        }, 100);
    }
});

// Botón de WhatsApp flotante
window.addEventListener('scroll', function () {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (window.scrollY > 100) {
        whatsappButton.style.display = 'flex'; // Muestra el botón
    } else {
        whatsappButton.style.display = 'flex'; // Siempre visible
    }
});


// Animación de marcas al hacer scroll
document.addEventListener('DOMContentLoaded', function () {
    const marcas = document.querySelectorAll('.marcas-lista li');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    marcas.forEach(marca => {
        const delay = index * 0.3;
        marca.style.animation = `fadeInUp 0.5s ease ${delay}s forwards paused`;
        observer.observe(marca);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const marcasSection = document.querySelector('#marcas-autos');
    const marcasItems = document.querySelectorAll('.marcas-lista li');

    // Usando Intersection Observer 
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        marcasItems.forEach(item => {
            observer.observe(item);
        });
    }
    // Fallback para navegadores antiguos
    else {
        function checkScroll() {
            const sectionTop = marcasSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                marcasItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
                window.removeEventListener('scroll', checkScroll);
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Comprobar al cargar la página por si ya está visible
    }
});

// Evitar redireccionamiento a formspree
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm'); // Cambiado a getElementById
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevenir el envío normal del formulario

            // Enviar formulario mediante fetch
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert('Formulario enviado correctamente.');
                        form.reset();
                        window.location.href = 'index.html'; // Redirigir a index.html
                    } else {
                        throw new Error('Error al enviar el formulario');
                    }
                })
                .catch(error => {
                    alert('Hubo un problema al enviar el mensaje: ' + error.message);
                });
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const carruselPista = document.querySelector('.carrusel-pista');
    const botones = document.querySelectorAll('.carrusel-boton');
    const items = document.querySelectorAll('.cuadro-fw');
    const totalItems = items.length;
    let indiceActual = 0;

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            if (boton.classList.contains('next')) {
                // Avanzar al siguiente ítem
                indiceActual = (indiceActual + 1) % totalItems;
            } else if (boton.classList.contains('prev')) {
                // Retroceder al ítem anterior
                indiceActual = (indiceActual - 1 + totalItems) % totalItems;
            }

            // Mover la pista del carrusel
            const desplazamiento = -indiceActual * 100; // Desplazamiento en porcentaje
            carruselPista.style.transform = `translateX(${desplazamiento}%)`;
        });
    });
});