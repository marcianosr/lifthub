const getLocalStorageKeys = Object.keys(localStorage).filter(log =>
  log.includes("training") ? log : null
);

const filteredLogs = getLocalStorageKeys.map(key => localStorage.getItem(key));

export const parsedLogs = filteredLogs.map(log => {
  return JSON.parse(log);
});
