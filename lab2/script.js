const images = document.querySelectorAll('img');
const containerWidth = 1200;
const move = containerWidth / images.length - 20;
let middle = Math.floor(images.length / 2)
let last = images.length - 1;
let transforms = [];

//dodajemy zdarzenie do klikniecia na obrazek

images.forEach((img, index ) => {
    img.addEventListener('click', () => {
    moveImages();
  })
});

//ustalamy przesuniecie obrazka

images.forEach((img, index) => {
  transforms[index] = (index - middle);
  img.style.transition = "filter 0.5s ease"
  img.style.transform = `translateX(${transforms[index]}px)`;
  console.log((index - middle));
});

//funkcja przesuwajaca obrazki 

function moveImages() {
 images.forEach((img,index) => {
    if(index == last){
     //przesuniecie dla ostatniego obrazka
      transforms[index] = transforms[index];
      img.style.transition = "transform 1s"; ;
      img.style.transform = `translateY(1000px)`;
      setTimeout(()=>{
        img.style.transition = "transform 1s";
        transforms[index] = transforms[index] - 4*move + 20;
        img.style.transform = `translateX(${transforms[index]}px)`;
        console.log(transforms)
      }, 1000);
    }
    else{
      img.style.transition = "transform 1s";
      transforms[index] += move ;
      img.style.transform = `translateX(${transforms[index]}px)`;
    }
      
  });
  if(last == 0)
    last = images.length - 1;
  else
    last--;
}