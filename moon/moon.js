function moonColor(color, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            let m = document.getElementById('moon');
            m.style.backgroundColor = color;
            resolve();
        }, delay); 
    });
}

async function light() {
    await moonColor ('rgb(255, 206, 102)', 1000);
    await moonColor ('rgb(227, 240, 239)', 1000);
    await moonColor ('rgb(255, 206, 102)', 1000);
    await moonColor ('rgb(227, 240, 239)', 1000);
    await moonColor ('rgb(255, 206, 102)', 1000);
    await moonColor ('rgb(227, 240, 239)', 1000);
}
light();