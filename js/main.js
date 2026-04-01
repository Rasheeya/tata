document.addEventListener('DOMContentLoaded', function() {
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenuBtn.addEventListener('click', () => {
        alert('Mobile navigation will be implemented here.');
    });

    // Search Tabs Toggle
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all tabs
            tabBtns.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            e.target.classList.add('active');
            
            // Here you could add logic to filter search or change placeholders based on Buy/Rent
            console.log(e.target.innerText + ' tab selected');
        });
    });

    // Heart icon toggle for favoriting properties
    const heartBtns = document.querySelectorAll('.property-footer .fa-heart');
    
    heartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = e.target.parentElement;
            if (e.target.classList.contains('far')) {
                e.target.classList.remove('far');
                e.target.classList.add('fas');
                e.target.style.color = 'var(--primary-color)';
            } else {
                e.target.classList.remove('fas');
                e.target.classList.add('far');
                e.target.style.color = 'var(--text-color)';
            }
        });
    });

});
