module.exports = function (cname) {
    //console.log('get cookie', cname);
    let cookieArr = document.cookie.split(';');
    let output = null;
    cookieArr.forEach(item => {
        let cookieVal = item.split('=');
        if (cookieVal[0].replace(' ', '') === cname) {
            output = cookieVal[1];
        }
    });
    return output;
}