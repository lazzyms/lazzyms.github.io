let defferdPromt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defferdPromt = e;
    btnAdd.style.display = 'block';

    btnAdd.addEventListener('click', (e) => {
        defferdPromt.prompt();
        defferdPromt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User Accepted the A2SH prompt')
            }
            defferdPromt = null;
        })
    })
})



window.addEventListener('appinstalled', (evt) => {
    app.logEvent('a2hs', 'installed');
})