import figlet from "figlet";

const server = Bun.serve({
  port: 3000,

  async fetch(req){
    console.log(req)
    const url = new URL(req.url)
    if (url.pathname === '/') {
      const body = figlet.textSync("I'm Learning Bun");
      return new Response(body);
    } else if (url.pathname === '/greet') {
      const path = "/greeting.txt";
      const file = Bun.file(path);

      const fileExists = await file.exists(); // boolean;
      if (fileExists) return new Response(Bun.file('./greeting.txt'))!
      throw new Error("File doesn't exist!")
    }

    return new Response('404!');
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
})

console.log(`Listening on port ${server.port}`);
