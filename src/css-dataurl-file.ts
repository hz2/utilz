import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";
import { toJSON } from "https://cdn.skypack.dev/-/css-convert-json@v1.1.0-M5V8VqLg5CkDU44KQOsq/dist=es2019,mode=imports/optimized/css-convert-json.js";

export async function Dataurl2File() {
  const { input } = parse(Deno.args, {
    string: ["input"],
  });

  const text = await Deno.readTextFile(input);
  try {
    Deno.removeSync("output", {
      recursive: true,
    });
  } catch (_error) {
    //
  }
  Deno.mkdirSync("output", {
    recursive: true,
  });

  const object = toJSON(text).children;
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      const name = key.replace(/([\.\-\w]+--)|\:before/g, "");
      const content = element["1"].replace(
        /base64\,|(\) 50% no-repeat\;)/g,
        "",
      );
      try {
        await Deno.writeTextFile("./output/" + name + ".svg", atob(content));
      } catch (error) {
        console.log("error", error);
      }
    }
  }
}
