const myBtn = document.getElementById('btnsearch')
const search = document.getElementById('search')
const result = document.getElementById('result')
const spinner = document.getElementById('spinner')



myBtn.addEventListener('click', function() {
    result.innerHTML = ""
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${search.value}&limit=10&exchange=NASDAQ`
    spinner.classList.add("d-none")
    async function stock() {
        spinner.classList.remove('d-none')
        const response = await fetch(url);
        const data = await response.json()
        console.log(data)

        for (let i = 0; i < data.length; i++) {

            result.innerHTML += f `<li><a href="company.html?symbol=${data[i].symbol}"> ${data[i].name}  (${data[i].symbol})</a></li>`
            spinner.classList.add('d-none')
        }

    }
    stock()




})