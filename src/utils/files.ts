import fs from "fs";

export const readLines = (fileName: string | number) => {
  try {
    const filePath = `src/2023/inputs/${fileName}.txt`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent.split("\n");
  } catch (e) {
    console.log("Oopsie file read error:", e);
    throw e;
  }
};

export const readRaw = (fileName: string | number) => {
  try {
    const filePath = `src/2023/inputs/${fileName}.txt`;
    return fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.log("Oopsie file read error:", e);
    throw e;
  }
};
