import jsPDF from 'jspdf';
import { SongData } from './songProcessor';

export function generateSingleSongPDF(song: SongData): void {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(song.title, 20, 20);
  doc.setFontSize(12);
  song.lyrics.forEach((stanza, index) => {
    doc.text(stanza.join('\n'), 20, 40 + (index * 30));
  });
  doc.save(`${song.title}.pdf`);
}

export async function generateFullBookPDF(songs: SongData[]): Promise<void> {
  const doc = new jsPDF();
  
  // Add cover page
  doc.setFontSize(22);
  doc.text('Ilahi Book', 10, 20);
  doc.addPage();

  // Add Table of Contents
  doc.setFontSize(16);
  doc.text('Table of Contents', 10, 20);
  songs.forEach((song, index) => {
    doc.text(`${index + 1}. ${song.title}`, 10, 30 + (index * 10));
  });
  doc.addPage();

  // Add song pages
  songs.forEach((song, index) => {
    doc.setFontSize(14);
    doc.text(song.title, 10, 20);
    doc.setFontSize(12);
    const lyricsText = song.lyrics.map(stanza => stanza.join('\n')).join('\n\n');
    doc.text(lyricsText, 10, 30);
    if (index < songs.length - 1) doc.addPage();
  });

  doc.save('ilahiBook.pdf');
}
