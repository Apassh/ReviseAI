import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export interface ExtractedPdf {
  pageCount: number
  /** Full extracted text, pages joined with double newlines. */
  text: string
}

/** Reads a PDF entirely client-side (no upload, no server) and returns its text content. */
export async function extractPdfText(
  file: File,
  onProgress?: (pagesDone: number, pageCount: number) => void,
): Promise<ExtractedPdf> {
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

  const pageTexts: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((item) => ('str' in item ? item.str : '')).join(' ')
    pageTexts.push(pageText)
    onProgress?.(i, pdf.numPages)
  }

  return { pageCount: pdf.numPages, text: pageTexts.join('\n\n') }
}
