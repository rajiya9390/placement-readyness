/**
 * KodNest Premium Build System
 * Core Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('KodNest Premium Design System Initialized');

    // Copy Prompt Functionality
    const copyBtn = document.getElementById('copy-prompt');
    const promptContent = document.querySelector('.prompt-box__content');

    if (copyBtn && promptContent) {
        copyBtn.addEventListener('click', () => {
            const originalText = copyBtn.textContent;
            
            navigator.clipboard.writeText(promptContent.textContent).then(() => {
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('btn--primary');
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('btn--primary');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // Proof Footer Logic
    const checkboxes = document.querySelectorAll('.checklist__checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const id = e.target.id;
            const proofInput = document.querySelector(`#proof-${id.split('-')[0]} input`);
            
            if (e.target.checked) {
                console.log(`Step ${id} marked as complete.`);
                // In a real app, we would validate proof here
            } else {
                console.log(`Step ${id} marked as incomplete.`);
            }
            
            updateGlobalProgress();
        });
    });

    function updateGlobalProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.checklist__checkbox:checked').length;
        const percentage = Math.round((checked / total) * 100);
        
        const progressFill = document.querySelector('.progress-indicator__fill');
        const progressLabel = document.querySelector('.progress-indicator__label');
        
        if (progressFill && progressLabel) {
            progressFill.style.width = `${percentage}%`;
            progressLabel.textContent = `Step 0${checked || 1} / 0${total}`;
        }

        const statusBadge = document.querySelector('.status-badge');
        if (statusBadge) {
            if (percentage === 100) {
                statusBadge.textContent = 'Shipped';
                statusBadge.style.background = '#E8F5E9';
                statusBadge.style.color = '#4A6741';
            } else if (percentage > 0) {
                statusBadge.textContent = 'In Progress';
                statusBadge.style.background = '#FFF9E6';
                statusBadge.style.color = '#856404';
            } else {
                statusBadge.textContent = 'Not Started';
                statusBadge.style.background = '#F7F6F3';
                statusBadge.style.color = '#555555';
            }
        }
    }
});
