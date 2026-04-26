const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const containerId = process.env.HOSTNAME || "Unknown";
    res.writeHead(200);
    res.end(`Hello from container ${containerId} on host ${os.hostname()}`);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
