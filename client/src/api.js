const api = {
  fetchTransactions: () => fetch('/transaction').then(r => r.json()),
  getTransaction: id => fetch(`/transaction/${id}`).then(r => r.json()),
};

export default api;
