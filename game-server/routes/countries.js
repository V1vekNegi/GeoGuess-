const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const countriesData = require("../data/countries.json");

router.get("/", async (req, res) => {
  const outlinesPath = path.join(__dirname, "../public/outlines/all");

  const countries = fs
    .readdirSync(outlinesPath)
    .filter((f) => fs.statSync(path.join(outlinesPath, f)).isDirectory());
   

  if (countries.length === 0) {
    return res.status(404).json({ message: "No countries found" });
  }

  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const countryPath = path.join(outlinesPath, randomCountry);
    

  const svgFiles = fs
    .readdirSync(countryPath)
    .filter((file) => file.endsWith(".svg"));
  if (svgFiles.length === 0) {
    return res
      .status(404)
      .json({ message: "No SVG files found for the country" });
  }
  const randomSvg = svgFiles[Math.floor(Math.random() * svgFiles.length)];
     

  try {
    const countryInfo = countriesData.find((country)=> country.code.toLowerCase() === randomCountry.toLowerCase());
   if (!countryInfo) {
    return res
      .status(404)
      .json({ message: "Country data not found in countries file" });
  }
   
    const data = countryInfo;
    res.json({
      code: randomCountry,
      name: data.name,
      capital: data.capital,
      region: data.region,
      population: data.population,
      flag: data.flag,
      language: data.language,
      famousDish: data.famousDish,
      outline: `/outlines/${randomCountry}/${randomSvg}`,
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
    res.status(500).json({ message: "Error fetching country data" });
  }
});
module.exports = router;
