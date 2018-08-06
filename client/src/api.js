const toJSON = r => r.json();
const handleError = err => console.error(err);
const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : '';

const api = {
  fetchTransactions: () => fetch(`${BASE_URL}/transaction`).then(toJSON).catch(handleError),
  getTransaction: id => fetch(`${BASE_URL}/transaction/${id}`).then(toJSON).catch(handleError),
};

export default api;
