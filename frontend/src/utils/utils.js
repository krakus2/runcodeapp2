import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export const validateEmail = email => {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
};

export const hexToRgb = hex =>
   hex
      .replace(
         /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
         (m, r, g, b) => '#' + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map(x => parseInt(x, 16));

export const addAlphaChannel = (color, a) => `rgba(${hexToRgb(color).join(', ')}, ${a})`;

export const isMobile = () => {
   if (/iPhone|Android/i.test(navigator.userAgent) || window.innerWidth < 900) {
      return true;
   } else {
      return false;
   }
};

export function getParams(location) {
   const searchParams = new URLSearchParams(location);
   return {
      task_id: searchParams.get('task_id') || ''
   };
}

export function subtractFunc(date) {
   return Math.round((Date.now() - new Date(date)) / (1000 * 3600 * 24));
}

export function getSqlYear(d) {
   return `${d.getFullYear()}-${
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
   }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
}

const cache = setupCache({
   maxAge: 15 * 60 * 1000 //15 minutes
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
   adapter: cache.adapter
});

export async function getDataFromDB(fromValue, task_id) {
   if (fromValue !== 'all') {
      const d = new Date();
      d.setDate(d.getDate() - fromValue);
      const sqlDate = getSqlYear(d);
      const length = await cache.store.length();
      console.log('Cache store length:', length);
      return api({
         url: `/api/tests/task_id=${task_id}&test_date=${sqlDate}&from_value=${fromValue}`,
         method: 'get'
      });
   } else {
      return api({
         url: `/api/tests/task_id=${task_id}&test_date=all&from_value=${fromValue}`,
         method: 'get'
      });
   }
}

export async function getDataFromDB2(fromValue, task_id, from, to) {
   if (fromValue !== 'all') {
      const d = new Date();
      d.setDate(d.getDate() - fromValue);
      const sqlDate = getSqlYear(d);
      const length = await cache.store.length();
      console.log('Cache store length:', length);
      return api({
         url: `/api/tests/task_id=${task_id}&test_date=${sqlDate}&from=${from}&to=${to}`,
         method: 'get'
      });
   } else {
      return api({
         url: `/api/tests/task_id=${task_id}&test_date=all&from=${from}&to=${to}`,
         method: 'get'
      });
   }
}

export function memoize(f) {
   let store = new Map(JSON.parse(localStorage.getItem('store'))) || new Map();

   return function(...args) {
      //dodać maxAge
      const k = JSON.stringify(args);
      if (store.has(k)) {
         console.log('z cachem');
         return store.get(k);
      } else {
         console.log("bez cache'a");
         store.set(k, f(...args));
         localStorage.setItem('store', JSON.stringify(Array.from(store.entries())));
         return store.get(k);
      }
   };
}
