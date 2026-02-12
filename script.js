document.addEventListener('DOMContentLoaded', function() {
            const emailButton = document.getElementById('emailButton');
            const emailTooltip = document.getElementById('emailTooltip');
            const emailOverlay = document.getElementById('emailOverlay');
            const copyEmailBtn = document.getElementById('copyEmailBtn');
            const closeEmailBtn = document.getElementById('closeEmailBtn');
            const copiedMessage = document.getElementById('copiedMessage');
            const emailAddress = document.getElementById('emailAddress');
            
            let tooltipVisible = false;
            
            // Mostrar mensaje emergente
            function showEmailTooltip() {
                emailTooltip.classList.add('active');
                emailOverlay.classList.add('active');
                tooltipVisible = true;
                
                // Agregar confeti
                createConfetti();
                
                // Deshabilitar scroll del body
                document.body.style.overflow = 'hidden';
            }
            
            // Ocultar mensaje emergente
            function hideEmailTooltip() {
                emailTooltip.classList.remove('active');
                emailOverlay.classList.remove('active');
                tooltipVisible = false;
                copiedMessage.classList.remove('active');
                
                // Habilitar scroll del body
                document.body.style.overflow = 'auto';
            }
            
            // Copiar email al portapapeles
            function copyEmailToClipboard() {
                const email = 'morena.bermejo0@gmail.com';
                
                navigator.clipboard.writeText(email)
                    .then(() => {
                        // Mostrar mensaje de confirmación
                        copiedMessage.classList.add('active');
                        
                        // Ocultar mensaje después de 2 segundos
                        setTimeout(() => {
                            copiedMessage.classList.remove('active');
                        }, 2000);
                        
                        // Más confeti para celebrar
                        createConfetti();
                    })
                    .catch(err => {
                        console.error('Error al copiar: ', err);
                        // Fallback para navegadores antiguos
                        const textArea = document.createElement('textarea');
                        textArea.value = email;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        
                        // Mostrar mensaje de confirmación igual
                        copiedMessage.classList.add('active');
                        setTimeout(() => {
                            copiedMessage.classList.remove('active');
                        }, 2000);
                    });
            }
            
            
            // Event Listeners
            emailButton.addEventListener('click', function(e) {
                e.preventDefault();
                showEmailTooltip();
            });
            
            emailOverlay.addEventListener('click', hideEmailTooltip);
            
            copyEmailBtn.addEventListener('click', copyEmailToClipboard);
            
            closeEmailBtn.addEventListener('click', hideEmailTooltip);
            
            // También cerrar con tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && tooltipVisible) {
                    hideEmailTooltip();
                }
            });
            
            // Prevenir que el clic dentro del tooltip cierre el overlay
            emailTooltip.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Si el usuario hace clic en la dirección de email, también copiar
            emailAddress.addEventListener('click', copyEmailToClipboard);
            
            // Mobile menu toggle (mantener funcionalidad existente)
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                });
            }
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href === '#') {
                        e.preventDefault();
                        return;
                    }
                    
                    if (href.includes('.html')) {
                        return;
                    }
                    
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 90,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Simple scroll animation for book button
            const bookBtn = document.querySelector('.book-btn');
            
            if (bookBtn) {
                const showBookBtnOnScroll = () => {
                    const btnTop = bookBtn.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (btnTop < windowHeight - 100) {
                        bookBtn.classList.add('show');
                        window.removeEventListener('scroll', showBookBtnOnScroll);
                    }
                };
                
                showBookBtnOnScroll();
                window.addEventListener('scroll', showBookBtnOnScroll);
            }
        });