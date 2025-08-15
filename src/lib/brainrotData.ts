export interface BrainrotItem {
  id: string;
  word: string; // Word to guess (variable length)
  imageUrl: string; // URL to the brainrot image
  description: string; // Description of the brainrot concept
}

export const BRAINROT_DATABASE: BrainrotItem[] = [
  {
    id: "skibidi",
    word: "SKIBIDI",
    imageUrl: "https://pngdownload.io/wp-content/uploads/2025/08/Cocofanto-Elefanto-Brainrot-Meme-Elephant-Coconut.avif", 
    description: "The viral toilet series that took over YouTube"
  },
  {
    id: "sigma",
    word: "SIGMA",
    imageUrl: "https://pngdownload.io/wp-content/uploads/2025/08/Cocofanto-Elefanto-Brainrot-Meme-Elephant-Coconut.avif", 
    description: "The alpha male mindset grindset"
  },
  {
    id: "rizz",
    word: "RIZZ",
    imageUrl: "https://pngdownload.io/wp-content/uploads/2025/08/Cocofanto-Elefanto-Brainrot-Meme-Elephant-Coconut.avif", 
    description: "Charisma and charm for getting dates"
  },
  {
    id: "ohio",
    word: "OHIO",
    imageUrl: "https://pngdownload.io/wp-content/uploads/2025/08/Cocofanto-Elefanto-Brainrot-Meme-Elephant-Coconut.avif", 
    description: "The state where only weird things happen"
  },
  {
    id: "gyatt",
    word: "GYATT",
    imageUrl: "https://pngdownload.io/wp-content/uploads/2025/08/Cocofanto-Elefanto-Brainrot-Meme-Elephant-Coconut.avif", 
    description: "Expression of surprise or admiration"
  },
  {
    id: "fanum",
    word: "FANUM",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop", 
    description: "The tax you pay when someone takes your food"
  },
  {
    id: "brain",
    word: "BRAINROT",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", 
    description: "What happens from too much internet"
  },
  {
    id: "alpha",
    word: "ALPHA",
    imageUrl: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=400&fit=crop&crop=face", 
    description: "The dominant personality type"
  },
  {
    id: "based",
    word: "BASED",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", 
    description: "Being true to yourself despite opinions"
  },
  {
    id: "cringe",
    word: "CRINGE",
    imageUrl: "https://images.unsplash.com/photo-1584999734482-0361aecad844?w=400&h=400&fit=crop&crop=face", 
    description: "Something embarrassing or awkward"
  },
  {
    id: "memes",
    word: "MEMES",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop", 
    description: "Internet culture's favorite content"
  },
  {
    id: "viral",
    word: "VIRAL",
    imageUrl: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=400&fit=crop", 
    description: "Content that spreads like wildfire"
  },
  {
    id: "tiktok",
    word: "TIKTOK",
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=400&fit=crop", 
    description: "The app that started it all"
  },
  {
    id: "goofy",
    word: "GOOFY",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face", 
    description: "Something silly or ridiculous"
  },
  {
    id: "noobs",
    word: "NOOB",
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop", 
    description: "New players who don't know what they're doing"
  },
  {
    id: "sussy",
    word: "SUS",
    imageUrl: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=400&fit=crop", 
    description: "Something suspicious or sketchy"
  },
  {
    id: "bussin",
    word: "BUSSIN",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop", 
    description: "Something that tastes really good"
  },
  {
    id: "yeet",
    word: "YEET",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop", 
    description: "To throw something with force"
  },
  {
    id: "flex",
    word: "FLEX",
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=400&fit=crop", 
    description: "To show off or boast"
  },
  {
    id: "cap",
    word: "CAP",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop", 
    description: "A lie or something false"
  }
];

// Function to get a random brainrot item
export function getRandomBrainrotItem(): BrainrotItem {
  return BRAINROT_DATABASE[Math.floor(Math.random() * BRAINROT_DATABASE.length)];
}

// Function to get brainrot item by word
export function getBrainrotItemByWord(word: string): BrainrotItem | undefined {
  return BRAINROT_DATABASE.find(item => item.word.toUpperCase() === word.toUpperCase());
}
