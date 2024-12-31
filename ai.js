const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyCsaC7tcEMmqmMSk5I4b24Qf3AmruaNEdQ');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


async function  ai(rawPrompt,aiRes) {
let prompt= JSON.stringify(rawPrompt)
const result = await model.generateContent(prompt);
console.log(result.response.text());
return aiRes(result.response.text());
}

module.exports = {ai};