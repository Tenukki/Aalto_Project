if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export const { PORT } = process.env;
export const { MONGOURL } = process.env;
export const { APIPASS } = process.env

