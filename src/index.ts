import request from "request";
import fs from "fs";
// @ts-ignore
import reply from "reply";

interface OptsInterface {
  amount: { message: string; allow_empty: boolean; type: string };
  type: { message: string; options: String[] };
}

interface AnswersInterface {
  amount: string | number;
  type: string;
}

const opts = {
  amount: {
    message: "Qual quantidade deseja gerar?",
    allow_empty: false,
    type: "number",
  },
  type: {
    message: "Qual o tipo de avatar deseja gerar?",
    options: [
      "adventurer",
      "adventurer-neutral",
      "avataaars",
      "big-ears",
      "big-ears-neutral",
      "big-smile",
      "bottts",
      "croodles",
      "croodles-neutral",
      "identicon",
      "initials",
      "micah",
      "miniavs",
      "open-peeps",
      "personas",
      "pixel-art",
      "pixel-art-neutral",
    ],
  },
} as OptsInterface;

const urls = [] as String[];

reply.get(opts, function (_err: Error, answers: AnswersInterface) {
  async function random(count: number = 0): Promise<void> {
    if (count == answers.amount) return console.log(urls);

    const randomSentence = count + Math.random();

    const uri = `https://avatars.dicebear.com/api/${
      answers.type || "pixel-art"
    }/${randomSentence}.svg`;

    request.head(uri, () => {
      request(uri)
        .pipe(fs.createWriteStream(`src/tmp/${randomSentence}.svg`))
        .on("close", () => console.log(`Image ${randomSentence} done`));
    });

    urls.push(uri);

    return random(count + 1);
  }

  random();
});
