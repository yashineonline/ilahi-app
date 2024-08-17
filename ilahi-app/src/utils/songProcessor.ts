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

// Extract the title, lyrics, translations, and YouTube link
const title = lines.shift() || ''; // First line is the title
const youtubeLink = lines.find(line => line.startsWith('Y:'))?.replace('Y:', '').trim() || 'Coming soon!';

// Remove the YouTube line if it exists
const contentLines = lines.filter(line => !line.startsWith('Y:'));

// Split content into lyrics and translation
const splitIndex = contentLines.findIndex(line => line.startsWith('T:'));
const lyricsLines = contentLines.slice(0, splitIndex).join('\n').trim();
const translationLines = contentLines.slice(splitIndex + 1).join('\n').trim() || 'Translation: Coming soon';

// Split stanzas
const splitStanzas = (text: string): string[][] => {
  return text === 'Translation: Coming soon' ? [['Translation: Coming soon']] : text.split('\n\n').map(stanza => stanza.trim().split('\n'));
};

// Extract lyrics and translations
const lyrics = splitStanzas(lyricsLines);
const translation = splitStanzas(translationLines);

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
// const songsData = processSongsFile('songs.txt');
// console.log(JSON.stringify(songsData, null, 2));
