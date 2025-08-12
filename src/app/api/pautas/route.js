import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'app', 'data', 'pautas.json');

async function readPautas() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { consepe: [], consuni: [] };
  }
}

async function writePautas(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const conselho = searchParams.get('conselho');
  const data = await readPautas();

  if (conselho) {
    return NextResponse.json(data[conselho] || []);
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { conselho, pauta } = body;

  if (!conselho || !pauta) {
    return NextResponse.json({ error: 'Conselho e pauta são obrigatórios' }, { status: 400 });
  }

  const data = await readPautas();
  data[conselho] = data[conselho] || [];
  data[conselho].push(pauta);
  await writePautas(data);

  return NextResponse.json(data[conselho], { status: 201 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const conselho = searchParams.get('conselho');
  const index = parseInt(searchParams.get('index') || '-1', 10);
  if (!conselho || index < 0) {
    return NextResponse.json({ error: 'Conselho e índice são obrigatórios' }, { status: 400 });
  }
  const data = await readPautas();
  data[conselho] = data[conselho] || [];
  data[conselho].splice(index, 1);
  await writePautas(data);
  return NextResponse.json(data[conselho]);
}
