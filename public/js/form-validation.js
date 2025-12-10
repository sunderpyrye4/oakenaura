// Form Validation for Oaken & Aura

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            const privacyChecked = document.getElementById('privacy').checked;
            
            // Validation flags
            let isValid = true;
            let errorMessage = '';
            
            // Validate name
            if (!name) {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            // Validate service selection
            if (!service) {
                isValid = false;
                errorMessage += 'Please select a service interest.\n';
            }
            
            // Validate message
            if (!message || message.length < 10) {
                isValid = false;
                errorMessage += 'Please provide more details about your project (minimum 10 characters).\n';
            }
            
            // Validate privacy agreement
            if (!privacyChecked) {
                isValid = false;
                errorMessage += 'You must agree to the Privacy Policy and Terms & Conditions.\n';
            }
            
            // Validate phone (optional but if provided, check format)
            if (phone) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                const cleanedPhone = phone.replace(/\D/g, '');
                if (!phoneRegex.test(cleanedPhone)) {
                    isValid = false;
                    errorMessage += 'Please enter a valid phone number.\n';
                }
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n\n' + errorMessage);
                return;
            }
            
            // If all validations pass
            alert('Thank you for your enquiry, ' + name + '! We will contact you within 24 hours to discuss your ' + service + ' project.');
            
            // In a real implementation, you would send the form data to a server here
            console.log('Form submitted:', { name, email, phone, service, message });
            
            // Reset form
            contactForm.reset();
            
            // Scroll to top for better UX
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Real-time form validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Add input event listeners for real-time validation
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim().length < 10) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
    
    // Character counter for message
    if (messageInput) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.fontSize = '0.8rem';
        charCounter.style.color = 'var(--text-light)';
        charCounter.style.textAlign = 'right';
        charCounter.style.marginTop = '-15px';
        charCounter.style.marginBottom = '20px';
        messageInput.parentNode.insertBefore(charCounter, messageInput.nextSibling);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length} characters (minimum 10)`;
            
            if (length < 10) {
                charCounter.style.color = '#ff6b6b';
            } else if (length > 500) {
                charCounter.style.color = '#ffa726';
            } else {
                charCounter.style.color = 'var(--text-light)';
            }
        });
    }
});