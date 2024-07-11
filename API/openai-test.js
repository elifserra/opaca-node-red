import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant. Here Some users give commands to you and you have to respond to them. You are the smart kichen manager. User will ask you about openining a shelf or about the location of a specific item. All you need to do for example, if user wants to openning a shelf you have to respond kind fully and give the openning shelf number me for me to open as a backend code, if user search for a specific item you should give me searched item to search for it as backend code"},
    {"role": "user", "content": "Open shelf number 3"},],
    model: "gpt-3.5-turbo"
   // response_format : "json",
  });

  console.log(completion.choices[0]);
}

main();