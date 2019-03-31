export const validateEmail = email => {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
};

const hexToRgb = hex =>
   hex
      .replace(
         /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
         (m, r, g, b) => '#' + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map(x => parseInt(x, 16));

export const addAlphaChannel = (color, a) => `rgba(${hexToRgb(color).join(', ')}, ${a})`;
