import { scrapeLicensePlate } from './scrapper'

const main = async () => {
  const result = await scrapeLicensePlate('AB12345')
  console.log(result)
}

main()