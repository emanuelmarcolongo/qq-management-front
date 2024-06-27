import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateExcel = <T>(
  data: T[],
  sheetName: string,
  fileName: string
): void => {
  // Converter dados em uma planilha
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // Criar um novo workbook e adicionar a planilha
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Gerar buffer
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Criar um Blob com o conteúdo do Excel
  const blob: Blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  // Usar file-saver para salvar o arquivo
  saveAs(blob, fileName);
};
