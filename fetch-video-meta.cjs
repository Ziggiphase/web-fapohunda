const https = require('https');
const fs = require('fs');

const ids = [
  "ZnHdkK4EhuE", "Wp6ouX2Su7g", "tXN69RN9EF4", "QqpsLCm3TjM", "NhxDn1dyvSg",
  "yEy2wJAHiFo", "YW0E_rAbIl4", "s5iDJZ__2kA", "IFTweRIZLkA", "AlugAuOX17k",
  "DrN3b1DfUUk", "X8MxtKi7gu0", "ictc4lIeSIA", "YZtf5XUXzKw", "7gjpl3xZPG0",
  "ME9pvuFk-3k", "TqwfEUlgj4I", "kI05uRZs8No", "6dtsHf8dlCc", "Kt7lIGwydvg",
  "PAbtE4kO8XM", "t6O2S5IlbKw", "HYliSMCfm3E", "K6L4BwHoPsI", "GAzixh23IoY",
  "-8dlON3LyYI", "QBqzAyhoshI", "2X7CAHXknDw", "u-WgtHDGi30", "aHrXRiyqFLk",
  "0eLXky6St8c", "mYCQMDlqORQ", "YqPFP7lWr_w", "6CNJrBKaaQ0", "RzQydEmTLL4",
  "E5Oxckf1v1o", "uoWi4Yfap-o", "5dcLTZCnju4", "3izr8GPKruA", "r_ZlRlnuRg8"
];

function fetchMetadata(id) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      let oembedData = '';
      res.on('data', chunk => oembedData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(oembedData);
          const meta = {
            id,
            title: parsed.title.replace(/"/g, '\\"'),
            channel: parsed.author_name || 'YouTube'
          };
          
          // Now fetch HTML for date
          https.get(`https://www.youtube.com/watch?v=${id}`, (htmlRes) => {
            let htmlData = '';
            htmlRes.on('data', chunk => htmlData += chunk);
            htmlRes.on('end', () => {
              const dateMatch = htmlData.match(/"uploadDate":"([^"]+)"/);
              meta.date = dateMatch ? dateMatch[1] : '2000-01-01'; // Fallback
              resolve(meta);
            });
          }).on('error', () => {
             meta.date = '2000-01-01';
             resolve(meta);
          });

        } catch (e) {
          resolve({ id, title: `Akin Fapohunda Media Intervention`, channel: 'YouTube', date: '2000-01-01' });
        }
      });
    }).on('error', () => resolve({ id, title: `Akin Fapohunda Media Intervention`, channel: 'YouTube', date: '2000-01-01' }));
  });
}

async function run() {
  const uniqueIds = [...new Set(ids)];
  const results = [];
  
  console.log(`Starting metadata fetch for ${uniqueIds.length} videos...`);
  
  for (const id of uniqueIds) {
    process.stdout.write(`Fetching ${id}... `);
    const res = await fetchMetadata(id);
    results.push(res);
    console.log(`Done (${res.date})`);
  }

  // Sort by date newest first
  results.sort((a, b) => new Date(b.date) - new Date(a.date));

  let injectionCode = "const dummyVideos = [\n";
  results.forEach(r => {
    injectionCode += `    { id: "${r.id}", title: "${r.title}", channel: "${r.channel}", date: "${r.date}" },\n`;
  });
  injectionCode += "  ];";

  const file = fs.readFileSync('./src/pages/Home.jsx', 'utf-8');
  if (file.includes("const dummyVideos = [")) {
    const newFile = file.replace(/const dummyVideos = \[[\s\S]*?\];/, injectionCode);
    fs.writeFileSync('./src/pages/Home.jsx', newFile, 'utf-8');
    console.log("\nSuccess: Injected sorted metadata into Home.jsx");
  } else {
    console.log("\nError: Could not find dummyVideos array in Home.jsx");
  }
}

run();
