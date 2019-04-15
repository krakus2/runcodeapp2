const size = {
   mobile: 320,
   desktop: 1000
};

export const device = {
   mobile: `(min-width: ${size.mobile}px) and (max-width: ${size.desktop - 1}px)`,
   desktop: `(min-width: ${size.desktop}px)`
};
