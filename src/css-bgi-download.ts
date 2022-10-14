// deno-lint-ignore-file
import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";

import { writableStreamFromWriter } from "https://deno.land/std@0.159.0/streams/mod.ts";
import { parse as tree } from "https://cdn.skypack.dev/css-tree";

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
  Deno.mkdirSync("output3", {
    recursive: true,
  });

  const arr = tree(text, {
    parseRulePrelude: false,
    parseValue: false,
  }).children.filter((x: { prelude: any; block: any }) => x.prelude && x.block)
    .map((x: { prelude: { value: any }; block: { children: any[] } }) => ({
      key: [
        ...[
          ...tree(x.prelude?.value, {
            context: "selectorList",
          }).children,
        ].map((x) => x.children)[0]?.map((x: { name: any }) => x.name).filter((
          x: string,
        ) =>
          (typeof x === "string") && x.trim() &&
          ![
            "before",
            "after",
            "hover",
            "glyph-cancel",
            "ow-glyph",
            "not",
            "html",
          ]
            .includes(x)
        ) || [],
      ].at(-1),
      val: [
        ...x.block.children?.filter((x: { value: { value: string } }) =>
          x.value?.value.startsWith("url")
        ).map((
          // deno-lint-ignore no-explicit-any
          x: { value: { value: any } },
        ) =>
          [
            ...tree(x.value?.value, {
              context: "value",
            }).children,
          ][0].value
        ),
      ].join(""),
    })).filter((x: { val: any }) => x.val);

  const genUrl = (url: string) =>
    url.startsWith("http") ? url : ("https://" + url);

  arr.forEach(async (x: { val: any; key: string }) => {
    const resp = await fetch(genUrl(x.val));

    if (resp.body) {
      const file = await Deno.open(
        "./output3/" + x.key + (x.val.endsWith("svg") ? ".svg" : ".png"),
        {
          write: true,
          create: true,
        },
      );
      const writableStream = writableStreamFromWriter(file);
      await resp.body.pipeTo(writableStream);
    }
    // try {
    //   await Deno.writeTextFile("./output2/" + x.key + ".svg",  jsonData );
    // } catch (error) {
    //   console.log("error", error);
    // }
  });
}

Dataurl2File();
