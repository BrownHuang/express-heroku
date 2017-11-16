const rp = require("request-promise")
const getInfo = require("./getInfo")

const KEY = process.env.KEY || 'AIzaSyBImOy7k7q3nRG0YOcN2Z4GfQDu3q7WYNE';

const searchRestaurant = async address => {
  let enAddress = encodeURI(address)
  let addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${enAddress}&key=${KEY}&language=zh-TW`

  let addressBody = await rp(addressUrl)
  let { lat, lng , formatted_address} = getInfo(JSON.parse(addressBody))
  let location = `${lat},${lng}`
  let placeUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&type=restaurant&key=${KEY}&language=zh-TW`

  let placeBody = await rp(placeUrl)
  placeBody = JSON.parse(placeBody)
  let places = placeBody.results.map(element => {
    return {
      name: element.name,
      rating: element.rating
    }
  })
  return {
    queryAddress: address,
    formatted_Address: formatted_address,
    lat,
    lng,
    places,
  }
}

/*
let result = searchRestaurant("台灣大學")
result.then((places) => {
  console.log(places)
})
*/

module.exports = searchRestaurant