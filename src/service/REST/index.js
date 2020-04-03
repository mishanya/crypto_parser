export default async function() {

    //Parse data from the proxy server
    return await fetch('http://localhost:3022/')
        .then(res => res.json())
        .then(json => json && json.data)
        .catch(err => console.log(err))

}