if (document.getElementsByTagName('img')) {
    const images = document.getElementsByTagName('img');

    for (let image of images) {
        image.addEventListener('load', function () {
            this.classList.add('loaded');
        });
    }
}
