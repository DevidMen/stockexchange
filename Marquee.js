class Marquee {
    constructor(element) {
        this.element = element

    }
    async load() {
        const banner = this.element
        const div = document.createElement('div');
        div.setAttribute('id', 'marquee__inner');
        this.element.appendChild(div);
        const urlBanner = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index`
        const responseBanner = await fetch(urlBanner)
        const dataBanner = await responseBanner.json()
        for (let i = 0; i < dataBanner.length; i++) {
            marquee__inner.innerHTML += `<span class="bannerSpan">${dataBanner[i].symbol}</span> <span class="bannerSpan ${Number(dataBanner[i].changesPercentage) > 0 ? 'green' : 'red'}">(${dataBanner[i].changesPercentage.toFixed(2)}%)</span>`
        }
    }

};