const REACT_APP_LOAD_SERVICES_URL = 'http://localhost:7070/api/services';

export const loadServices = async () => {
  const response = await fetch(REACT_APP_LOAD_SERVICES_URL);
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json();
};

export const loadServiceDetails = async (id) => {
  const response = await fetch(`${REACT_APP_LOAD_SERVICES_URL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json();
};
