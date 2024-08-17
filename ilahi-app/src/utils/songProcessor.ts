//import fs from 'fs';

export interface SongData {
  title: string;
  lyrics: string[][];
  translation: string[][];
  youtubeLink: string;
}

// Function to read and process the text file
export function processSongsFile(fileContent: string): SongData[] {
  // Read the content of the file
//  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Split content by 'Y:' and blank lines to get each song section
  const songSections = fileContent.split(/\n\s*\n/).map(section => section.trim()).filter(section => section.length > 0);

  // Function to process each song section
  const processSong = (section: string): SongData => {
    // Split by lines
    const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Find the index of 'Y:' which indicates the end of the current song
    const yIndex = lines.findIndex(line => line.startsWith('Y:'));
    if (yIndex === -1) {
      throw new Error('No YouTube link found.');
    }

    // Extract the title, lyrics, translations, and YouTube link
    const title = lines.shift() || ''; // First line is the title
    const lyricsLines = lines.slice(0, yIndex).join('\n').trim();
    const youtubeLink = lines[yIndex].replace('Y: ', '').trim();
    const translationLines = lines.slice(yIndex + 1).join('\n').trim();

    // Split stanzas
    const splitStanzas = (text: string): string[][] => {
      return text.split('\n\n').map(stanza => stanza.trim().split('\n'));
    };

    // Extract lyrics and translations
    const lyrics = splitStanzas(lyricsLines);
    const translation = translationLines ? splitStanzas(translationLines) : [];

    return {
      title,
      lyrics,
      translation,
      youtubeLink
    };
  };

  // Process each song section
  const processedSongs = songSections.map(processSong);

  return processedSongs;
}

// Example usage
const songsData = processSongsFile('songs.txt');
console.log(JSON.stringify(songsData, null, 2));
