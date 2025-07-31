// TabelaMemorial.jsx
import React, { useState } from 'react';

const TabelaMemorial = () => {
  const [colunas, setColunas] = useState(['Ambiente', 'Modelo', 'Quantidade']);
  const [linhas, setLinhas] = useState([
    ['', '', '']
  ]);
  const [titulo, setTitulo] = useState('Memorial Descritivo | Revestimentos');

  const handleTituloChange = (e) => setTitulo(e.target.value);

  const handleCellChange = (linhaIndex, colunaIndex, valor) => {
    const novasLinhas = [...linhas];
    novasLinhas[linhaIndex][colunaIndex] = valor;
    setLinhas(novasLinhas);
  };

  const adicionarLinha = () => {
    setLinhas([...linhas, Array(colunas.length).fill('')]);
  };

  const adicionarColuna = () => {
    const novaColuna = prompt('Nome da nova coluna:');
    if (novaColuna) {
      setColunas([...colunas, novaColuna]);
      setLinhas(linhas.map(linha => [...linha, '']));
    }
  };

  const removerLinha = (index) => {
    const novasLinhas = [...linhas];
    novasLinhas.splice(index, 1);
    setLinhas(novasLinhas);
  };

  const removerColuna = (index) => {
    const novasColunas = [...colunas];
    novasColunas.splice(index, 1);
    setColunas(novasColunas);
    setLinhas(linhas.map(linha => {
      const novaLinha = [...linha];
      novaLinha.splice(index, 1);
      return novaLinha;
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        value={titulo}
        onChange={handleTituloChange}
        style={{
          fontSize: '24px',
          marginBottom: '10px',
          border: 'none',
          borderBottom: '2px solid #ccc',
          width: '100%',
        }}
      />
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {colunas.map((coluna, i) => (
              <th key={i}>
                <input
                  value={coluna}
                  onChange={(e) => {
                    const novasColunas = [...colunas];
                    novasColunas[i] = e.target.value;
                    setColunas(novasColunas);
                  }}
                  style={{ fontWeight: 'bold', width: '100%' }}
                />
                <button onClick={() => removerColuna(i)}>🗑️</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, linhaIndex) => (
            <tr key={linhaIndex}>
              {linha.map((celula, colunaIndex) => (
                <td key={colunaIndex}>
                  <input
                    value={celula}
                    onChange={(e) => handleCellChange(linhaIndex, colunaIndex, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => removerLinha(linhaIndex)}>🗑️ Linha</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '15px' }}>
        <button onClick={adicionarLinha}>➕ Adicionar Linha</button>
        <button onClick={adicionarColuna} style={{ marginLeft: '10px' }}>
          ➕ Adicionar Coluna
        </button>
      </div>
    </div>
  );
};

export default TabelaMemorial;
