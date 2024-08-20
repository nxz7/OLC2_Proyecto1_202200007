export const Symbols = {
    allVariables: {},

    addVariable(nombre, valor, tipo, simbType, linea, columna) {
        this.allVariables[nombre] = { valor, tipo, simbType, linea, columna };
    },

    updateVariable(nombre, valor) {
        if (this.allVariables[nombre]) {
            this.allVariables[nombre].valor = valor;
        } else {
            console.error(`Variable:  ${nombre} - no se encuentra en la tabla de simbolos.`);
        }
    },

    getVariable(nombre) {
        return this.allVariables[nombre];
    },

    generateHTMLTable() {
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Symbol Table</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #829BB9;
                    color: white;
                }
            </style>
        </head>
        <body>
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Fila</th>
                    <th>Columna</th>
                    <th>Estructura</th>
                </tr>`;

        for (let nombre in this.allVariables) {
            const variable = this.allVariables[nombre];
            htmlContent += `
            <tr>
                <td>${nombre}</td>
                <td>${variable.tipo}</td>
                <td>${variable.valor}</td>
                <td>${variable.linea}</td>
                <td>${variable.columna}</td>
                <td>${variable.simbType}</td>
            </tr>`;
        }

        htmlContent += `
            </table>
        </body>
        </html>`;

        // documenta creado de esta manera usar unicamente javascript vanilla

        // blob para crear el archivo
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // link para poder descargar
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SymTable.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // liberar la url
        URL.revokeObjectURL(url);

        console.log("tabla de simbolos creada");
    }
};
