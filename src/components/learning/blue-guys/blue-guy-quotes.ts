export interface BlueGuyQuote {
  id: string;
  quote: string;
  movieRef: string;
  character: string;
  category: 'loading' | 'navigation' | 'celebration' | 'pillar' | 'interactive';
  vibe: 'heroic' | 'dramatic' | 'hilarious' | 'tech';
}

export const BLUE_GUY_QUOTES: BlueGuyQuote[] = [
  // ---------------------------------------------------------------------------
  // LOADING / FETCHING QUOTES (Concise 10-14 words, readable in 4 seconds!)
  // ---------------------------------------------------------------------------
  {
    id: 'load-don',
    quote: "Catching this malware is impossible? Not for our Blue Team SIEM indexer!",
    movieRef: "Inspired by Don: 'Catching Don is impossible!'",
    character: 'Agent Don Byte',
    category: 'loading',
    vibe: 'heroic',
  },
  {
    id: 'load-uri',
    quote: "SOC Analysts, how is the morale?! High, Captain! Streaming intelligence now!",
    movieRef: "Inspired by Uri: 'How is the morale? High, Sir!'",
    character: 'Captain Kernel',
    category: 'loading',
    vibe: 'heroic',
  },
  {
    id: 'load-pushpa',
    quote: "Tell the ransomware: Pushpa never bends, and our servers never go down!",
    movieRef: "Inspired by Pushpa: 'Pushpa never bows down!'",
    character: 'Bit Blue',
    category: 'loading',
    vibe: 'dramatic',
  },
  {
    id: 'load-baahubali-katappa',
    quote: "Forget Katappa—why on earth did the user open that macro invoice?!",
    movieRef: "Inspired by Baahubali: 'The Great Unsolved Mystery'",
    character: 'Agent Cobalt',
    category: 'loading',
    vibe: 'hilarious',
  },
  {
    id: 'load-chennai-express',
    quote: "Never underestimate the raw analytical power of a common L1 SOC analyst!",
    movieRef: "Inspired by Chennai Express: 'The Power of a Common Man'",
    character: 'Priya Bot',
    category: 'loading',
    vibe: 'heroic',
  },
  {
    id: 'load-crime-master-gogo',
    quote: "Crime Master Gogo is here! If I can't steal admin, I'll take a cookie!",
    movieRef: "Inspired by Andaz Apna Apna: 'Crime Master Gogo'",
    character: 'Gogo Byte',
    category: 'loading',
    vibe: 'hilarious',
  },
  {
    id: 'load-sholay-gabbar',
    quote: "Chief, how many rogue packets were there? Just two, and both dropped!",
    movieRef: "Inspired by Sholay: 'How many intruders were there?'",
    character: 'Agent Cobalt',
    category: 'loading',
    vibe: 'hilarious',
  },
  {
    id: 'load-rajini-sunglasses',
    quote: "No multithreading needed—I flip my sunglasses and the botnet surrenders in style!",
    movieRef: "Inspired by Rajinikanth Cinema: Signature sunglasses swagger",
    character: 'Thalaiva Blue',
    category: 'loading',
    vibe: 'heroic',
  },
  {
    id: 'load-3-idiots',
    quote: "All is well! If the primary SIEM fails, secondary replica takes over!",
    movieRef: "Inspired by 3 Idiots: 'All Is Well!'",
    character: 'Raju Blue',
    category: 'loading',
    vibe: 'hilarious',
  },
  {
    id: 'load-mr-india',
    quote: "Mogambo is extremely pleased with your pristine 5 Ws incident docket!",
    movieRef: "Inspired by Mr. India: 'Mogambo is pleased!'",
    character: 'Mogambo SOC',
    category: 'loading',
    vibe: 'dramatic',
  },
  {
    id: 'load-namak-halaal',
    quote: "I can walk telemetry, I can talk telemetry—telemetry runs in my veins!",
    movieRef: "Inspired by Namak Halaal: 'I can talk English, I can walk English'",
    character: 'Agent Don Byte',
    category: 'loading',
    vibe: 'hilarious',
  },
  {
    id: 'load-deewar',
    quote: "Adversaries have zero-days... But what do we have? We have Sysmon Event 1!",
    movieRef: "Inspired by Deewar: 'I have my guardian with me!'",
    character: 'Bit Blue',
    category: 'loading',
    vibe: 'dramatic',
  },

  // ---------------------------------------------------------------------------
  // NAVIGATION / NEXT & PREVIOUS QUOTES
  // ---------------------------------------------------------------------------
  {
    id: 'nav-om-shanti-om',
    quote: "The picture is not over yet, my friend! On to the next chapter of enterprise defense!",
    movieRef: "Inspired by Om Shanti Om: 'The picture is not over yet, my friend!'",
    character: 'Agent Don Byte',
    category: 'navigation',
    vibe: 'heroic',
  },
  {
    id: 'nav-wanted-commitment',
    quote: "Once I click 'Next Chapter', I don't even listen to the root administrator! Forward march!",
    movieRef: "Inspired by Wanted: 'Once I make a commitment...'",
    character: 'Captain Kernel',
    category: 'navigation',
    vibe: 'heroic',
  },
  {
    id: 'nav-amar-prem',
    quote: "Rajesh, I hate packet drops! Wipe away those latency tears and let's navigate forward!",
    movieRef: "Inspired by Amar Prem: 'Pushpa, I hate tears...'",
    character: 'Rajesh Blue',
    category: 'navigation',
    vibe: 'dramatic',
  },
  {
    id: 'nav-flashback-rewind',
    quote: "Rewinding the tape! Even the greatest cinema action heroes review the flashback before striking back!",
    movieRef: "Inspired by Indian Cinema Flashback Sequences",
    character: 'Bit Blue',
    category: 'navigation',
    vibe: 'hilarious',
  },
  {
    id: 'nav-munna-bhai-tension',
    quote: "Friend, take zero tension! Isolate the VLAN, sip your tea, and advance to the next stage!",
    movieRef: "Inspired by Munna Bhai: 'Take zero tension, my friend!'",
    character: 'Agent Cobalt',
    category: 'navigation',
    vibe: 'hilarious',
  },
  {
    id: 'nav-singham-temper',
    quote: "When an unauthorized remote desktop pings our perimeter, my CPU core temperature spikes to maximum rage!",
    movieRef: "Inspired by Singham: 'Now my temper has flared!'",
    character: 'Singham SOC',
    category: 'navigation',
    vibe: 'heroic',
  },
  {
    id: 'nav-kgf-rocky',
    quote: "Ransomware syndicates think they own the dark web. But in this operations center, Rocky writes the firewall rules!",
    movieRef: "Inspired by KGF: 'Violence, violence, violence...'",
    character: 'Rocky Byte',
    category: 'navigation',
    vibe: 'heroic',
  },
  {
    id: 'nav-ddlj-simran',
    quote: "Go, analyst, go! Live your operational life and conquer all three learning pillars before shift handover!",
    movieRef: "Inspired by DDLJ: 'Go Simran, go live your life!'",
    character: 'Agent Don Byte',
    category: 'navigation',
    vibe: 'dramatic',
  },

  // ---------------------------------------------------------------------------
  // CELEBRATION / CHAPTER COMPLETE QUOTES
  // ---------------------------------------------------------------------------
  {
    id: 'cel-rrr-hero-entry',
    quote: "What an entry! You burst through the security audit like a hero riding a tiger and a freight train! Victory!",
    movieRef: "Inspired by RRR: Epic double hero interval entry",
    character: 'Thalaiva Blue',
    category: 'celebration',
    vibe: 'heroic',
  },
  {
    id: 'cel-dangal-gold',
    quote: "Is our apprentice Priya any less than a Principal Threat Hunter? Look at that pristine audit score!",
    movieRef: "Inspired by Dangal: 'Are my daughters any less than boys?'",
    character: 'Captain Kernel',
    category: 'celebration',
    vibe: 'heroic',
  },
  {
    id: 'cel-baahubali-shivalingam',
    quote: "Lifting a 500-gigabyte PCAP file with one hand like a royal golden idol! That is true L1 dominance!",
    movieRef: "Inspired by Baahubali: Lifting the massive stone waterfall idol",
    character: 'Agent Don Byte',
    category: 'celebration',
    vibe: 'heroic',
  },
  {
    id: 'cel-happy-ending',
    quote: "In the end, all good logs correlate happily ever after! And if they haven't yet, the investigation is not over!",
    movieRef: "Inspired by Indian Cinema Grand Climax: 'All is well in the end'",
    character: 'Agent Cobalt',
    category: 'celebration',
    vibe: 'hilarious',
  },
  {
    id: 'cel-lagaan-victory',
    quote: "No extra tax on our bandwidth today! Clean victory on the final delivery over the boundary line!",
    movieRef: "Inspired by Lagaan: The famous final sixer over the boundary",
    character: 'Bit Blue',
    category: 'celebration',
    vibe: 'heroic',
  },

  // ---------------------------------------------------------------------------
  // PILLAR SWITCHING QUOTES
  // ---------------------------------------------------------------------------
  {
    id: 'pil-slow-motion',
    quote: "Cue the heavy brass horns and wind machine: switching pillars in full cinematic slow-motion swagger!",
    movieRef: "Inspired by South Cinema Mass Hero Entry",
    character: 'Thalaiva Blue',
    category: 'pillar',
    vibe: 'heroic',
  },
  {
    id: 'pil-special-26',
    quote: "A suspicious script entered the system? Show your authorized IT change ticket or face immediate quarantine!",
    movieRef: "Inspired by Special 26: Fake CBI raid confronting perpetrators",
    character: 'Singham SOC',
    category: 'pillar',
    vibe: 'dramatic',
  },
  {
    id: 'pil-hera-pheri',
    quote: "Double your network bandwidth in 21 days? That sounds like a textbook phishing email from an unverified domain!",
    movieRef: "Inspired by Hera Pheri: 'Double your money in 21 days scheme'",
    character: 'Officer Blue',
    category: 'pillar',
    vibe: 'hilarious',
  },
  {
    id: 'pil-agneepath',
    quote: "Listen carefully! Time: 09:12 UTC. Place: Bengaluru branch. Incident: Active lateral movement. Disposition: True Positive!",
    movieRef: "Inspired by Agneepath: Iconic courtroom self-introduction",
    character: 'Agent Don Byte',
    category: 'pillar',
    vibe: 'dramatic',
  },

  // ---------------------------------------------------------------------------
  // INTERACTIVE CLICK QUOTES (Clicking the Blue Guy)
  // ---------------------------------------------------------------------------
  {
    id: 'int-ghajini-hashes',
    quote: "I write down every single forensic hash immediately—because short-term memory is no excuse during shift handover!",
    movieRef: "Inspired by Ghajini: Memory notes and tattoos",
    character: 'Bit Blue',
    category: 'interactive',
    vibe: 'hilarious',
  },
  {
    id: 'int-vikram-hunting',
    quote: "Once the threat hunting season begins, our Blue Team does not sleep until every rogue socket is terminated!",
    movieRef: "Inspired by Vikram: 'Let the battle begin!'",
    character: 'Captain Kernel',
    category: 'interactive',
    vibe: 'heroic',
  },
  {
    id: 'int-kamal-haasan-indian',
    quote: "Zero tolerance for security violations! Even if you are the executive director, do not plug that random USB into the server!",
    movieRef: "Inspired by Indian (Hindustani): Zero tolerance vigilante",
    character: 'Singham SOC',
    category: 'interactive',
    vibe: 'dramatic',
  },
  {
    id: 'int-robot-chitti',
    quote: "Speed 1 Terahertz, Memory 1 Petabyte! Hello Bengaluru, I am Blue Guy version 2.0, upgraded and fully patched!",
    movieRef: "Inspired by Enthiran / Robot: 'Speed 1 Terahertz, memory 1 Zettabyte!'",
    character: 'Chitti Blue',
    category: 'interactive',
    vibe: 'tech',
  },
  {
    id: 'int-zindagi-milegi',
    quote: "Seize the moment, my friend! You only live once, but our Active Directory replicates across three redundant data centers!",
    movieRef: "Inspired by Zindagi Na Milegi Dobara: 'Seize the day'",
    character: 'Agent Cobalt',
    category: 'interactive',
    vibe: 'hilarious',
  },
];

// Helper to get random quote by category or all
export function getRandomQuote(category?: BlueGuyQuote['category']): BlueGuyQuote {
  const pool = category ? BLUE_GUY_QUOTES.filter((q) => q.category === category) : BLUE_GUY_QUOTES;
  const list = pool.length > 0 ? pool : BLUE_GUY_QUOTES;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}
