document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('journal-form');
    const entryText = document.getElementById('entry-text');
    const entriesDiv = document.getElementById('entries');

    function fetchEntries() {
        fetch('/entries')
            .then(response => response.json())
            .then(entries => {
                entriesDiv.innerHTML = '';
                entries.forEach(entry => {
                    const entryDiv = document.createElement('div');
                    entryDiv.className = 'entry';
                    entryDiv.textContent = entry.text;
                    entriesDiv.appendChild(entryDiv);
                });
            });
    }

    fetchEntries();

    form.addEventListener('submit', event => {
        event.preventDefault();

        const newEntry = { text: entryText.value };
        fetch('/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEntry)
        })
        .then(() => {
            entryText.value = '';
            fetchEntries();
        });
    });
});