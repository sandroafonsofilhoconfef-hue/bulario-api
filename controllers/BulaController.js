const { AppError } = require('../helpers/AppError');

const API_BASE = 'https://bulario-api.vercel.app/api';

let fetch;
if (typeof globalThis.fetch === 'undefined') {
  fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
} else {
  fetch = globalThis.fetch;
}

const buscar = async (nome, pagina = 1) => {
  const url = `${API_BASE}/consulta?nome=${encodeURIComponent(nome)}&pagina=${pagina}`;
  const res = await fetch(url);
  if (!res.ok) throw new AppError(`Erro HTTP ${res.status}`, res.status);
  return await res.json();
};


const buscarV2 = async (nome, pagina = 1, count = 4) => {
    try {
        const url = `${API_BASE}/busca?nome=${encodeURIComponent(nome)}&pagina=${pagina}&count=${count}`;
        const res = await fetch(url);
        if (!res.ok) throw new AppError(`Erro HTTP ${res.status}`, res.status);
        return await res.json();
    } catch (error) {
        throw new AppError(error.message || error, 400);
    }
};

const getByNum = async (numProcesso) => {
    try {
        const url = `${API_BASE}/medicamento/${numProcesso}`;
        const res = await fetch(url);
        if (!res.ok) throw new AppError(`Erro HTTP ${res.status}`, res.status);
        return await res.json();
    } catch (error) {
        throw new AppError(error.message || error, 400);
    }
};

const listaCategorias = async () => {
    try {
        const res = await fetch(`${API_BASE}/categorias`);
        if (!res.ok) throw new AppError(`Erro HTTP ${res.status}`, res.status);
        return await res.json();
    } catch (error) {
        throw new AppError(error.message || error, 400);
    }
};

const getByCat = async (categoria, pagina = 1) => {
    try {
        const url = `${API_BASE}/categoria/${categoria}?pagina=${pagina}`;
        const res = await fetch(url);
        if (!res.ok) throw new AppError(`Erro HTTP ${res.status}`, res.status);
        return await res.json();
    } catch (error) {
        throw new AppError(error.message || error, 400);
    }
};

const getLink = async (id) => {
    return `${API_BASE}/bula/${id}`;
};

const getPdf = async (id) => {
    try {
        const url = `${API_BASE}/bula/${id}`;
        const res = await fetch(url);
        if (!res.ok) throw new AppError(`Erro HTTP ${res.status}`, res.status);
        return await res.arrayBuffer();
    } catch (error) {
        throw new AppError(error.message || error, 400);
    }
};

module.exports = { buscar, buscarV2, getByNum, listaCategorias, getByCat, getLink, getPdf };
