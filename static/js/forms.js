// ===========================================
// Sovereign Self Health - Form Handler
// Connects all lead capture forms to Loops.so
// ===========================================

(function() {
    // Your Loops.so form endpoint
    const LOOPS_ENDPOINT = 'https://app.loops.so/api/newsletter-form/cmjv1dixy03dd0izse45bdaov';

    // Find all lead forms on the page
    const forms = document.querySelectorAll('.lead-form, #contact-form, #blog-newsletter-form');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Get form data
            const formData = new FormData(form);
            const email = formData.get('email');
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Build URL-encoded body (matching Loops.so expected format)
            const formBody = "userGroup=&mailingLists=&email=" + encodeURIComponent(email);
            
            try {
                const response = await fetch(LOOPS_ENDPOINT, {
                    method: 'POST',
                    body: formBody,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                
                if (response.ok) {
                    // Success - show confirmation
                    form.innerHTML = `
                        <div style="text-align: center; padding: 1rem 0;">
                            <p style="color: #10B981; font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem;">✓ You're in!</p>
                            <p style="color: #94a3b8; font-size: 0.9rem;">Check your inbox for the Hidden Stressors Checklist.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // Error - reset button and show message
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                alert('Something went wrong. Please try again or email directly.');
                console.error('Form submission error:', error);
            }
        });
    });
})();
