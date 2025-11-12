import PocketBase from 'pocketbase';

const url = new URLSearchParams(location.search).get('pb')
  || (import.meta as any).env?.VITE_PB_URL
  || `${location.protocol}//${location.hostname}:8090`;

export default new PocketBase(url);
