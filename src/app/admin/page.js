"use client";

import { useEffect, useState } from 'react';

export default function Admin() {
  const [token, setToken] = useState('');
  const [consepe, setConsepe] = useState([]);
  const [consuni, setConsuni] = useState([]);
  const [form, setForm] = useState({
    conselho: 'consepe',
    titulo: '',
    status: '',
    data: '',
    descricao: '',
    statusColor: '',
  });

  useEffect(() => {
    fetch('/api/pautas?conselho=consepe').then(res => res.json()).then(setConsepe);
    fetch('/api/pautas?conselho=consuni').then(res => res.json()).then(setConsuni);
  }, []);

  async function addPauta(e) {
    e.preventDefault();
    const res = await fetch('/api/pautas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ conselho: form.conselho, pauta: {
        titulo: form.titulo,
        status: form.status,
        data: form.data,
        descricao: form.descricao,
        statusColor: form.statusColor,
      } }),
    });
    if (res.ok) {
      const updated = await res.json();
      if (form.conselho === 'consepe') {
        setConsepe(updated);
      } else {
        setConsuni(updated);
      }
      setForm({ ...form, titulo: '', status: '', data: '', descricao: '', statusColor: '' });
    } else {
      alert('Erro ao salvar pauta');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Administração de Pautas</h1>
      <form onSubmit={addPauta} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1">Token</label>
          <input type="password" value={token} onChange={e => setToken(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Conselho</label>
          <select value={form.conselho} onChange={e => setForm({ ...form, conselho: e.target.value })} className="border p-2 w-full">
            <option value="consepe">CONSEPE</option>
            <option value="consuni">CONSUNI</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Título</label>
          <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <input value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Data</label>
          <input value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Descrição</label>
          <textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Classe de cor do Status</label>
          <input value={form.statusColor} onChange={e => setForm({ ...form, statusColor: e.target.value })} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded">Adicionar Pauta</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Pautas CONSEPE</h2>
      <ul className="mb-8">
        {consepe.map((p, idx) => (
          <li key={idx} className="border p-2 mb-2">{p.titulo}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Pautas CONSUNI</h2>
      <ul>
        {consuni.map((p, idx) => (
          <li key={idx} className="border p-2 mb-2">{p.titulo}</li>
        ))}
      </ul>
    </div>
  );
}
