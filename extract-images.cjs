const https = require('https');
https.get('https://fapohunda.org.ng/', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const urls = body.match(/src="([^"]+\.(?:png|jpg|jpeg|gif|webp))"/gi);
    if(urls) {
      const uniqueUrls = Array.from(new Set(urls.map(s => s.slice(5, -1))));
      console.log(JSON.stringify(uniqueUrls, null, 2));
    } else {
      console.log("No images found");
    }
  });
});
