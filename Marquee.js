class Marquee {
    constructor(element) {
        this.element = element

    }
    async banner() {
        const banner = this.element
        const urlBanner = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index`
        const responseBanner = await fetch(urlBanner)
        const dataBanner = await responseBanner.json()
        console.log(banner)
        for (let i = 0; i < dataBanner.length; i++) {
            banner.innerHTML += `<span class="bannerSpan">${dataBanner[i].symbol}</span> <span class="bannerSpan ${Number(dataBanner[i].changesPercentage) > 0 ? 'green' : 'red'}">(${dataBanner[i].changesPercentage.toFixed(2)})</span>`
        }
    }

};

const getMarquee = new Marquee(document.getElementById('banner'));
getMarquee.banner()