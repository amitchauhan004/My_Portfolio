document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.navbar a');
    let sectionInView = false;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            sectionInView = true;

            if (section.id === 'home') {
                header.style.backgroundColor = 'var(--bg-color)';
            } else if (section.id === 'skills') {
                header.style.backgroundColor = 'var(--second-bg-color)';
            } else if (section.id === 'about') {
                header.style.backgroundColor = 'var(--second-bg-color)';
            } else if (section.id === 'education') {
                header.style.backgroundColor = 'var(--bg-color)';
            } else if (section.id === 'projects') {
                header.style.backgroundColor = 'var(--bg-color)';
            } else if (section.id === 'contact') {
                header.style.backgroundColor = 'var(--second-bg-color)';
            }


            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });

            section.classList.add('show-animate');
        } else {
            section.classList.remove('show-animate');
        }
    });

    const footer = document.querySelector('footer');
    if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            footer.classList.add('show-animate');
        } else {
            footer.classList.remove('show-animate');
        }
    }

    if (!sectionInView) {
        header.style.backgroundColor = 'var(--default-bg-color)';
        navLinks.forEach(link => link.classList.remove('active'));
    }
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    window.onscroll = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const data = {
                name: form.querySelector('input[placeholder="Full Name"]').value,
                email: form.querySelector('input[placeholder="Email Address"]').value,
                mobile: form.querySelector('input[placeholder="Mobile Number"]').value,
                subject: form.querySelector('input[placeholder="Email Subject"]').value,
                message: form.querySelector('textarea[placeholder="Your Message"]').value
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.message);
            form.reset();
        });
    }
});
