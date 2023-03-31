let about = '';
let quote = '';
axios.get('https://tronalddump.io/random/quote')
.then((result) =>{
    const trumpObj = result.data
    about = trumpObj.tags["0"]
    quote = trumpObj.value
    insertQuote(quote)
})
.catch((err)=>{
    console.log(err);
})

function insertQuote (quote) {
    const quoteBox = document.getElementById("quote");
    quoteBox.innerText = quote

}
