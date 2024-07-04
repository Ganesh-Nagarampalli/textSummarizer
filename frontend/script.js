document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const summaryTextArea = document.getElementById('summary');

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const text = document.getElementById('text_to_summarize').value;

        submitButton.disabled = true;
        submitButton.classList.add('submit-button--loading');

        try {
            const response = await fetch('/.netlify/functions/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();
            summaryTextArea.value = data.summary;
        } catch (error) {
            console.error('Error:', error);
            summaryTextArea.value = 'Failed to summarize text.';
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('submit-button--loading');
        }
    });
});
