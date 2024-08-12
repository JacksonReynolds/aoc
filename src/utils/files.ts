import fs from "fs";

export const readLines = <T = any>(
  fileName: string | number,
  mapFn: (e: string) => T = (e: string) => e as T,
): T[] => {
  try {
    const filePath = `src/2023/inputs/${fileName}.txt`;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent.split("\n").map(mapFn);
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
