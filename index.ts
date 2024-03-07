import figlet from "figlet";

const server = Bun.serve({
  port: 3000,

  fetch(req){
    console.log(req)
    const url = new URL(req.url)
    if (url.pathname === '/') {
      const body = figlet.textSync("I'm Learning Bun");
      return new Response(body);
    }

    return new Response('404!');
  }
})

console.log(`Listening on port ${server.port}`);
