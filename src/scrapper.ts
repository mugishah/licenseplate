import axios from 'axios';
import cheerio from 'cheerio';
import { MongoClient } from 'mongodb';

export const scrapeLicensePlate = async (licensePlate: string): Promise<void> => {
  let data: any = {};
  try {
    const url = `https://www.tjekbil.dk/${licensePlate}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract information from the page
    const make = $('.resultMake').text().trim();
    const model = $('.resultModel').text().trim();
    const registrationDate = $('.resultFirstReg').text().trim();
    const registrationNumber = $('.resultRegNumber').text().trim();
    data = {
      make,
      model,
      registrationDate,
      licensePlate,
      registrationNumber,
    };
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
  return data;
}

// Usage example
export default scrapeLicensePlate;
