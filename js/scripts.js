// // Initialize AOS
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize AOS after header is loaded
//     setTimeout(() => {
//         if (typeof AOS !== 'undefined') {
//             AOS.init({
//                 duration: 800,
//                 once: true,
//                 easing: 'ease-out-quad'
//             });
//         }
//     }, 100);
// });

// // Rain Effect
// document.addEventListener('DOMContentLoaded', function() {
//     const canvas = document.getElementById("flutterRain");
//     if (!canvas) return;
    
//     const ctx = canvas.getContext("2d");
    
//     function resizeCanvas() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     }
    
//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();
    
//     let drops = [];
//     const chars = ["</>", "c++", "c#", "js", "db", "dart", "flutter", "python", "laravel", "html", "css", "php"];
    
//     for (let i = 0; i < 50; i++) {
//         drops.push({
//             x: Math.random() * canvas.width,
//             y: Math.random() * canvas.height,
//             speedY: 1 + Math.random() * 3,
//             speedX: Math.random() * 0.5 - 0.25,
//             text: chars[Math.floor(Math.random() * chars.length)],
//             size: 14 + Math.random() * 10,
//             opacity: 0.1 + Math.random() * 0.3
//         });
//     }
    
//     function draw() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.font = 'bold 16px Arial';
//         drops.forEach((drop) => {
//             ctx.font = `${drop.size}px Arial`;
//             ctx.fillStyle = `rgba(0, 188, 212, ${drop.opacity})`;
//             ctx.fillText(drop.text, drop.x, drop.y);
//             drop.y += drop.speedY;
//             drop.x += drop.speedX;
//             if (drop.y > canvas.height) {
//                 drop.y = -20;
//                 drop.x = Math.random() * canvas.width;
//             }
//             if (drop.x > canvas.width || drop.x < 0) {
//                 drop.speedX = -drop.speedX;
//             }
//         });
//         requestAnimationFrame(draw);
//     }
    
//     draw();
// });