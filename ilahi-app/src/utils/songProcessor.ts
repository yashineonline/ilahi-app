export interface SongData {
  title: string;
  lyrics: string[][];
  translation: string[][];
  youtubeLink: string;
}

export function processSongsFile(fileContent: string): SongData[] {
  // Remove HTML tags and metadata
  const cleanContent = fileContent.replace(/<[^>]*>|<meta[^>]*>/g, '').trim();

  const songSections = cleanContent.split(/\n\s*\n/).filter(section => section.trim().length > 0);

  return songSections.map(section => {
    const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const title = lines[0];
    const youtubeLink = lines.find(line => line.startsWith('Y:'))?.replace('Y:', '').trim() || 'Coming soon!';
    const lyricsStart = lines.findIndex(line => line === 'L:') + 1;
    const translationStart = lines.findIndex(line => line === 'T:') + 1;

    const splitStanzas = (text: string): string[][] => {
      return text.split('\n\n').map(stanza => stanza.trim().split('\n'));
    };

    const lyrics = splitStanzas(lines.slice(lyricsStart, translationStart - 1).join('\n'));
    const translation = translationStart !== -1 ? splitStanzas(lines.slice(translationStart).join('\n')) : [];

    return {
      title,
      lyrics,
      translation,
      youtubeLink
    };
  });
}

