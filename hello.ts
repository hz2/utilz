
const write = ()=> {
  await Deno.writeTextFile("hello.txt", "Hello World");
}

export write
