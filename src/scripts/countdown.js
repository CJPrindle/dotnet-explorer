module.exports = function countdown(tick) {
  console.log('counting...');
  let counter = 3;

  let timer = setInterval(_ => {
    tick(counter--);
    if (counter === -1) {
      clearInterval(timer);
    }
  }, 1000);
}