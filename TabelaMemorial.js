/*
  Arquivo: src/TabelaMemorial.js
  Dependências: 
    npm install jspdf html2canvas
*/
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TabelaMemorial = () => {
  // Tema: 'light' ou 'dark'
  const [theme, setTheme] = useState("light");
  const pdfRef = useRef();

  // Estado do título principal
  const [titulo, setTitulo] = useState("Memorial Descritivo");

  // Seções com colunas, linhas e identificadores
  const [secoes, setSecoes] = useState([
    {
      id: Date.now(),
      tituloSecao: "Seção 1",
      colunas: ["Ambiente", "Descrição", "Quantidade"],
      linhas: [["Sala", "Piso cerâmico", "20"]],
    },
  ]);

  // Alterna tema
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Funções de CRUD
  const handleTituloChange = (e) => setTitulo(e.target.value);
  const atualizarSecao = (id, valor) => {
    setSecoes((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, tituloSecao: valor } : sec))
    );
  };
  const adicionarSecao = () => {
    setSecoes((prev) => [
      ...prev,
      {
        id: Date.now(),
        tituloSecao: `Seção ${prev.length + 1}`,
        colunas: ["Ambiente", "Descrição", "Quantidade"],
        linhas: [["", "", ""]],
      },
    ]);
  };
  const adicionarColuna = (secaoId) => {
    setSecoes((prev) =>
      prev.map((sec) => {
        if (sec.id !== secaoId) return sec;
        const novasCols = [...sec.colunas, `Coluna ${sec.colunas.length + 1}`];
        const novasLinhas = sec.linhas.map((l) => [...l, ""]);
        return { ...sec, colunas: novasCols, linhas: novasLinhas };
      })
    );
  };
  const atualizarColuna = (secaoId, idx, valor) => {
    setSecoes((prev) =>
      prev.map((sec) => {
        if (sec.id !== secaoId) return sec;
        const cols = sec.colunas.map((c, i) => (i === idx ? valor : c));
        return { ...sec, colunas: cols };
      })
    );
  };
  const excluirColuna = (secaoId, idx) => {
    setSecoes((prev) =>
      prev.map((sec) => {
        if (sec.id !== secaoId) return sec;
        const cols = sec.colunas.filter((_, i) => i !== idx);
        const linhas = sec.linhas.map((l) => l.filter((_, i) => i !== idx));
        return { ...sec, colunas: cols, linhas };
      })
    );
  };
  const adicionarLinha = (secaoId) => {
    setSecoes((prev) =>
      prev.map((sec) =>
        sec.id === secaoId
          ? { ...sec, linhas: [...sec.linhas, new Array(sec.colunas.length).fill("")] }
          : sec
      )
    );
  };
  const atualizarCelula = (secaoId, li, ci, valor) => {
    setSecoes((prev) =>
      prev.map((sec) => {
        if (sec.id !== secaoId) return sec;
        const linhas = sec.linhas.map((l, i) =>
          i === li ? l.map((c, j) => (j === ci ? valor : c)) : l
        );
        return { ...sec, linhas };
      })
    );
  };
  const excluirLinha = (secaoId, li) => {
    setSecoes((prev) =>
      prev.map((sec) =>
        sec.id === secaoId
          ? { ...sec, linhas: sec.linhas.filter((_, i) => i !== li) }
          : sec
      )
    );
  };
  const excluirSecao = (secaoId) => {
    setSecoes((prev) => prev.filter((sec) => sec.id !== secaoId));
  };

  // Exporta para PDF via html2canvas + jsPDF
  const exportarPDF = () => {
    if (!pdfRef.current) return;
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("memorial.pdf");
    });
  };

  // Estilos dinâmicos por tema + centralização e escala de fonte
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: theme === "light" ? "#fff" : "#222",
      color: theme === "light" ? "#111" : "#eee",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      fontSize: "105%",
    },
    tituloInput: {
      fontSize: 28 * 1.05,
      fontWeight: "bold",
      width: "60%",
      padding: "8px",
      marginBottom: 20,
      borderRadius: 6,
      border: "2px solid",
      borderColor: theme === "light" ? "#333" : "#888",
      textAlign: "center",
      background: theme === "light" ? "#f9f9f9" : "#333",
      color: theme === "light" ? "#111" : "#eee",
    },
    secao: {
      width: "80%",
      marginBottom: 30,
      border: "1px solid #888",
      borderRadius: 8,
      padding: 15,
      background: theme === "light" ? "#fafafa" : "#333",
    },
    inputSecao: {
      fontSize: 20 * 1.05,
      marginBottom: 10,
      padding: "4px",
      borderRadius: 4,
      border: "1px solid",
      borderColor: theme === "light" ? "#666" : "#aaa",
      background: theme === "light" ? "#fff" : "#444",
      color: theme === "light" ? "#111" : "#eee",
      flex: 1,
    },
    tabela: { width: "100%", borderCollapse: "collapse", marginBottom: 10 },
    th: {
      padding: 8,
      border: "1px solid",
      borderColor: theme === "light" ? "#666" : "#aaa",
      fontSize: 14 * 1.05,
    },
    td: { padding: 4, border: "1px solid #999", fontSize: 14 * 1.05 },
    inputCel: {
      width: "95%",
      padding: 4,
      borderRadius: 4,
      border: "1px solid #aaa",
      background: theme === "light" ? "#fff" : "#444",
      color: theme === "light" ? "#111" : "#eee",
      fontSize: 14 * 1.05,
    },
    botoes: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 },
    botao: {
      padding: "6px 12px",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: "bold",
      background: theme === "light" ? "#007bff" : "#0056b3",
      color: "#fff",
      fontSize: 14 * 1.05,
    },
  };

  return (
    <div style={styles.container} ref={pdfRef}>
      <div style={{ alignSelf: "flex-end" }}>
        <button onClick={toggleTheme} style={styles.botao}>
          Modo {theme === "light" ? "Escuro" : "Claro"}
        </button>
      </div>

      <input
        type="text"
        value={titulo}
        onChange={handleTituloChange}
        style={styles.tituloInput}
      />

      {secoes.map((sec) => (
        <div key={sec.id} style={styles.secao}>          
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              type="text"
              value={sec.tituloSecao}
              onChange={(e) => atualizarSecao(sec.id, e.target.value)}
              style={styles.inputSecao}
            />
            <button onClick={() => excluirSecao(sec.id)} style={styles.botao}>
              Excluir Seção
            </button>
          </div>

          <table style={styles.tabela}>
            <thead>
              <tr>
                {sec.colunas.map((col, ci) => (
                  <th key={ci} style={styles.th}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="text"
                        value={col}
                        onChange={(e) => atualizarColuna(sec.id, ci, e.target.value)}
                        style={styles.inputCel}
                      />
                      <button
                        onClick={() => excluirColuna(sec.id, ci)}
                        style={{ ...styles.botao, marginLeft: 4, padding: "2px 6px" }}
                      >
                        ×
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sec.linhas.map((linha, li) => (
                <tr key={li}>
                  {linha.map((cel, ci) => (
                    <td key={ci} style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={cel}
                          onChange={(e) => atualizarCelula(sec.id, li, ci, e.target.value)}
                          style={styles.inputCel}
                        />
                        {ci === linha.length - 1 && (
                          <button
                            onClick={() => excluirLinha(sec.id, li)}
                            style={{ ...styles.botao, marginLeft: 4, padding: "2px 6px" }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.botoes}>
            <button onClick={() => adicionarColuna(sec.id)} style={styles.botao}>
              + Coluna
            </button>
            <button onClick={() => adicionarLinha(sec.id)} style={styles.botao}>
              + Linha
            </button>
          </div>
        </div>
      ))}

      <div style={styles.botoes}>
        <button onClick={adicionarSecao} style={styles.botao}>
          Adicionar Seção
        </button>
        <button onClick={exportarPDF} style={styles.botao}>
          Exportar para PDF
        </button>
      </div>
    </div>
  );
};

export default TabelaMemorial;