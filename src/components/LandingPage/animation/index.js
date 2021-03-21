import gsap from "gsap/all";

/**
 * @param {number} height
 * @param {Object} timelineConf @see {@link https://greensock.com/docs/v3/GSAP/Timeline}
 */
function openDataAnimation({ height, timelineConf }) {
  let tl = gsap.timeline({ ...timelineConf });

  tl.to(".landingPage__button", {
    transform: "scale(0)",
    ease: "back.in()"
  })
    .to(".landingPage__dataWrapper", {
      maxHeight: height,
      ease: "expo.inOut()",
      duration: 1.5
    })
    .to(".landingPage__dataWrapper", {
      opacity: 1
    });
}

export { openDataAnimation };
