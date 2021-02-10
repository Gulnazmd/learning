const btn = document.querySelector('button');
btn.addEventListener('mouseover', function() {
    console.log('mouse over me!')
    const height = Math.floor(Math.random() * window.innerHeight);
    const width = Math.floor(Math.random() * window.innerWidth);
    btn.style.left = `${width}px`;
    btn.style.top = `${height}px`;
});
btn.addEventListener('touchstart', function() {
    console.log('mouse over me!')
    const height = Math.floor(Math.random() * window.innerHeight);
    const width = Math.floor(Math.random() * window.innerWidth);
    btn.style.left = `${width}px`;
    btn.style.top = `${height}px`;
});