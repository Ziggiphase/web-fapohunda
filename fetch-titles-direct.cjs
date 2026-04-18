const https = require('https');
const fs = require('fs');

const ids = [
  "ZnHdkK4EhuE", "Wp6ouX2Su7g", "tXN69RN9EF4", "QqpsLCm3TjM", "NhxDn1dyvSg",
  "yEy2wJAHiFo", "YW0E_rAbIl4", "s5iDJZ__2kA", "IFTweRIZLkA", "AlugAuOX17k",
  "DrN3b1DfUUk", "X8MxtKi7gu0", "ictc4lIeSIA", "YZtf5XUXzKw", "7gjpl3xZPG0",
  "ME9pvuFk-3k", "TqwfEUlgj4I", "kI05uRZs8No", "6dtsHf8dlCc", "Kt7lIGwydvg",
  "PAbtE4kO8XM", "t6O2S5IlbKw", "HYliSMCfm3E", "K6L4BwHoPsI", "GAzixh23IoY",
  "-8dlON3LyYI", "QBqzAyhoshI", "2X7CAHXknDw", "u-WgtHDGi30", "aHrXRiyqFLk",
  "0eLXky6St8c", "Vhxkmhp8Z54", "mYCQMDlqORQ", "YqPFP7lWr_w", "6CNJrBKaaQ0",
  "RzQydEmTLL4", "E5Oxckf1v1o", "rFZX99nt-Jo", "uoWi4Yfap-o", "LUiqPueSv2s",
  "5dcLTZCnju4", "3_Kr5dsgOho", "3izr8GPKruA", "LKiKhfutjUY", "r_ZlRlnuRg8"
];

function fetchTitle(id) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ id, title: parsed.title.replace(/"/g, '\\"') });
        } catch (e) {
          resolve({ id, title: `Akin Fapohunda Media Intervention` });
        }
      });
    }).on('error', () => resolve({ id, title: `Akin Fapohunda Media Intervention` }));
  });
}

async function run() {
  const uniqueIds = [...new Set(ids)];
  const results = [];
  
  for (const id of uniqueIds) {
    const res = await fetchTitle(id);
    results.push(res);
  }

  let injectionCode = "const dummyVideos = [\n";
  results.forEach(r => {
    injectionCode += `    { id: "${r.id}", title: "${r.title}" },\n`;
  });
  injectionCode += "  ];";

  const file = fs.readFileSync('./src/pages/Home.jsx', 'utf-8');
  if (file.includes("const dummyVideos = [")) {
    const newFile = file.replace(/const dummyVideos = \[[\s\S]*?\];/, injectionCode);
    fs.writeFileSync('./src/pages/Home.jsx', newFile, 'utf-8');
    console.log("Successfully injected all 45 videos directly into Home.jsx");
  } else {
    console.log("Could not find dummyVideos array in Home.jsx");
  }
}

run();
