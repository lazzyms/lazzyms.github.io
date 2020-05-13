var _beforeInstallPrompt;

if ("onbeforeinstallprompt" in window) {

    window.addEventListener("beforeinstallprompt", beforeInstallPrompt);

}

function beforeInstallPrompt(evt) {

    evt.preventDefault();

    _beforeInstallPrompt = evt;

    return _beforeInstallPrompt.prompt()
        .then(function (evt) {

            // Wait for the user to respond to the prompt
            return _beforeInstallPrompt.userChoice;

        })
        .then(function (choiceResult) {

            //do stuff here
        })
        .catch(function (err) {

            if (err.message.indexOf("user gesture") > -1) {
                //recycle, but make sure there is a user gesture involved
            } else if (err.message.indexOf("The app is already installed") > -1) {
                //the app is installed, no need to prompt, but you may need to log or update state values
            } else {
                return err;
            }

        });

} let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later on the button event.
    deferredPrompt = e;
    // Update UI by showing a button to notify the user they can add to home screen
    btn.style.display = 'block';
});

//button click event to show the promt
btn.addEventListener('click', (e) => {
    // hide our user interface that shows our button
    btn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the prompt');
            } else {
                console.log('User dismissed the prompt');
            }
            deferredPrompt = null;
        });
});

window.addEventListener('appinstalled', (event) => {
    console.log('installed');
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('display-mode is standalone');
}

if (window.navigator.standalone === true) {
    console.log('display-mode is standalone');
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('service worker installed'))
      .catch(err => console.error('Error', err));
  }