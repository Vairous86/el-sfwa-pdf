import fs from "fs";

// Read the font file
const fontPath = "./public/fonts/amiri-regular.ttf";
const outputPath = "./amiri-regular.base64.txt";

fs.readFile(fontPath, (err, data) => {
  if (err) {
    console.error("Error reading the font file:", err);
    return;
  }

  // Convert to Base64
  const base64Font = data.toString("base64");

  // Write the Base64 string to a file
  fs.writeFile(outputPath, base64Font, (err) => {
    if (err) {
      console.error("Error writing the Base64 file:", err);
    } else {
      console.log("Base64 conversion successful. Output saved to", outputPath);
    }
  });
});
