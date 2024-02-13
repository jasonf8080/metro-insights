// const handleScrollWidth = (element) => {
//   if(element.current){
//       element.current.addEventListener('scroll', () => { 
//         const currentScroll = element.current.scrollLeft;
//         const maxScroll = element.current.scrollWidth - innerSlider.current.clientWidth;

//        setSliderPosition((currentScroll / maxScroll) * 100)
       
//       })
//     }
// }



export const scrollToSection = (targetID) => {
  const targetSection = document.getElementById(targetID);

  if (targetSection) {
    const rect = targetSection.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop + 180;

    // Calculate the desired scroll position, adjusting for the -50% positioning
    const targetScrollPosition = rect.top + scrollTop - window.innerHeight / 2;

    // Scroll to the calculated position
    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
 window.scrollTo({
      top:  0,
      behavior: 'smooth'
    });
}

export const scrollToValue = (value) => {
 window.scrollTo({
      top: value,
      behavior: 'smooth'
    });
}


export const removeOverlay = (className) => {
    const overlay = document.querySelector(className);

      if(overlay){
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 3000)

      }

}