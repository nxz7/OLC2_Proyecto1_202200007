export class Error {
    constructor() {
        this.errors = [];
    }

    addError(tipo, description, linea, columna) {
        this.errors.push({ tipo, description, linea, columna });
    }

    generateHtmlError() {
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error Report</title>
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
                    background-color: #A481E2;
                    color: white;
                }
            </style>
        </head>
        <body>
            <table border="1">
                <tr>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>`;

        this.errors.forEach(error => {
            htmlContent += `
            <tr>
                <td>${error.tipo}</td>
                <td>${error.description}</td>
                <td>${error.linea}</td>
                <td>${error.columna}</td>
            </tr>`;
        });

        htmlContent += `
            </table>
        </body>
        </html>`;

        // blov para crear el archivo
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // link para mandar el archivo
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Errores.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // URL
        URL.revokeObjectURL(url);

        console.log("Error report created");
    }
}