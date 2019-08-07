"use strict"

require("dotenv").config()

const ARBITRAGEAPI = require("./index")

require("./redis")

// Name, Price, Quote, Asset
let symbols = [
  { exchange: "binance", name: "ADABNB", ask: 0, bid: 0, quote: "BNB", asset: "ADA" },
  { exchange: "binance", name: "ADABTC", ask: 0, bid: 0, quote: "BTC", asset: "ADA" },
  { exchange: "binance", name: "ADAETH", ask: 0, bid: 0, quote: "ETH", asset: "ADA" },
  { exchange: "binance", name: "AGIBTC", ask: 0, bid: 0, quote: "BTC", asset: "AGI" },
  { exchange: "binance", name: "AIONBTC", ask: 0, bid: 0, quote: "BTC", asset: "AION" },
  { exchange: "binance", name: "ALGOBNB", ask: 0, bid: 0, quote: "BNB", asset: "ALGO" },
  { exchange: "binance", name: "ALGOBTC", ask: 0, bid: 0, quote: "BTC", asset: "ALGO" },
  { exchange: "binance", name: "ANKRBTC", ask: 0, bid: 0, quote: "BTC", asset: "ANKR" },
  { exchange: "binance", name: "ARKBTC", ask: 0, bid: 0, quote: "BTC", asset: "ARK" },
  { exchange: "binance", name: "ATOMBTC", ask: 0, bid: 0, quote: "BTC", asset: "ATOM" },
  { exchange: "binance", name: "BATBTC", ask: 0, bid: 0, quote: "BTC", asset: "BAT" },
  { exchange: "binance", name: "BCHABCBTC", ask: 0, bid: 0, quote: "BTC", asset: "BCHABC" },
  { exchange: "binance", name: "BCHABCUSDT", ask: 0, bid: 0, quote: "USDT", asset: "BCHABC" },
  { exchange: "binance", name: "BNBBTC", ask: 0, bid: 0, quote: "BTC", asset: "BNB" },
  { exchange: "binance", name: "BNBETH", ask: 0, bid: 0, quote: "ETH", asset: "BNB" },
  { exchange: "binance", name: "BNBUSDT", ask: 0, bid: 0, quote: "USDT", asset: "BNB" },
  { exchange: "binance", name: "BRDBNB", ask: 0, bid: 0, quote: "BNB", asset: "BRD" },
  { exchange: "binance", name: "BTCUSDT", ask: 0, bid: 0, quote: "USDT", asset: "BTC" },
  { exchange: "binance", name: "BTGBTC", ask: 0, bid: 0, quote: "BTC", asset: "BTG" },

  { exchange: "binance", name: "CELRBTC", ask: 0, bid: 0, quote: "BTC", asset: "CELR" },
  { exchange: "binance", name: "DASHBTC", ask: 0, bid: 0, quote: "BTC", asset: "DASH" },
  { exchange: "binance", name: "DENTBTC", ask: 0, bid: 0, quote: "BTC", asset: "DENT" },
  { exchange: "binance", name: "DLTBTC", ask: 0, bid: 0, quote: "BTC", asset: "DLT" },
  { exchange: "binance", name: "DUSKBTC", ask: 0, bid: 0, quote: "BTC", asset: "DUSK" },
  { exchange: "binance", name: "ELFBTC", ask: 0, bid: 0, quote: "BTC", asset: "ELF" },
  { exchange: "binance", name: "ENJBTC", ask: 0, bid: 0, quote: "BTC", asset: "ENJ" },
  { exchange: "binance", name: "EOSBNB", ask: 0, bid: 0, quote: "BNB", asset: "EOS" },
  { exchange: "binance", name: "EOSBTC", ask: 0, bid: 0, quote: "BTC", asset: "EOS" },
  { exchange: "binance", name: "EOSETH", ask: 0, bid: 0, quote: "ETH", asset: "EOS" },
  { exchange: "binance", name: "EOSUSDT", ask: 0, bid: 0, quote: "USDT", asset: "EOS" },
  { exchange: "binance", name: "ERDBNB", ask: 0, bid: 0, quote: "BNB", asset: "ERD" },
  { exchange: "binance", name: "ERDBTC", ask: 0, bid: 0, quote: "BTC", asset: "ERD" },
  { exchange: "binance", name: "ETCBTC", ask: 0, bid: 0, quote: "BTC", asset: "ETC" },
  { exchange: "binance", name: "ETHBTC", ask: 0, bid: 0, quote: "BTC", asset: "ETH" },
  { exchange: "binance", name: "ETHUSDT", ask: 0, bid: 0, quote: "USDT", asset: "ETH" },
  { exchange: "binance", name: "EVXBTC", ask: 0, bid: 0, quote: "BTC", asset: "EVX" },
  { exchange: "binance", name: "FETBNB", ask: 0, bid: 0, quote: "BNB", asset: "FET" },
  { exchange: "binance", name: "FETBTC", ask: 0, bid: 0, quote: "BTC", asset: "FET" },
  { exchange: "binance", name: "FTMBTC", ask: 0, bid: 0, quote: "BTC", asset: "FTM" },
  { exchange: "binance", name: "FUNBTC", ask: 0, bid: 0, quote: "BTC", asset: "FUN" },
  { exchange: "binance", name: "GRSBTC", ask: 0, bid: 0, quote: "BTC", asset: "GRS" },
  { exchange: "binance", name: "GRSETH", ask: 0, bid: 0, quote: "ETH", asset: "GRS" },

  { exchange: "binance", name: "ICXBTC", ask: 0, bid: 0, quote: "BTC", asset: "ICX" },
  { exchange: "binance", name: "IOTABTC", ask: 0, bid: 0, quote: "BTC", asset: "IOTA" },
  { exchange: "binance", name: "KMDBTC", ask: 0, bid: 0, quote: "BTC", asset: "KMD" },
  { exchange: "binance", name: "KNCBTC", ask: 0, bid: 0, quote: "BTC", asset: "KNC" },
  { exchange: "binance", name: "KNCETH", ask: 0, bid: 0, quote: "ETH", asset: "KNC" },
  { exchange: "binance", name: "LINKBTC", ask: 0, bid: 0, quote: "BTC", asset: "LINK" },
  { exchange: "binance", name: "LINKETH", ask: 0, bid: 0, quote: "ETH", asset: "LINK" },
  { exchange: "binance", name: "LINKUSDT", ask: 0, bid: 0, quote: "USDT", asset: "LINK" },
  { exchange: "binance", name: "LRCBTC", ask: 0, bid: 0, quote: "BTC", asset: "LRC" },
  { exchange: "binance", name: "LRCETH", ask: 0, bid: 0, quote: "ETH", asset: "LRC" },
  { exchange: "binance", name: "LTCBNB", ask: 0, bid: 0, quote: "BNB", asset: "LTC" },
  { exchange: "binance", name: "LTCBTC", ask: 0, bid: 0, quote: "BTC", asset: "LTC" },
  { exchange: "binance", name: "LTCETH", ask: 0, bid: 0, quote: "ETH", asset: "LTC" },
  { exchange: "binance", name: "LTCUSDT", ask: 0, bid: 0, quote: "USDT", asset: "LTC" },
  { exchange: "binance", name: "MANABTC", ask: 0, bid: 0, quote: "BTC", asset: "MANA" },
  { exchange: "binance", name: "MATICBTC", ask: 0, bid: 0, quote: "BTC", asset: "MATIC" },
  { exchange: "binance", name: "MDABTC", ask: 0, bid: 0, quote: "BTC", asset: "MDA" },
  { exchange: "binance", name: "MTLBTC", ask: 0, bid: 0, quote: "BTC", asset: "MTL" },
  { exchange: "binance", name: "NANOBTC", ask: 0, bid: 0, quote: "BTC", asset: "NANO" },
  { exchange: "binance", name: "NEOBNB", ask: 0, bid: 0, quote: "BNB", asset: "NEO" },
  { exchange: "binance", name: "NEOBTC", ask: 0, bid: 0, quote: "BTC", asset: "NEO" },
  { exchange: "binance", name: "NEOETH", ask: 0, bid: 0, quote: "ETH", asset: "NEO" },
  { exchange: "binance", name: "NEOUSDT", ask: 0, bid: 0, quote: "USDT", asset: "NEO" },
  { exchange: "binance", name: "NPXSBTC", ask: 0, bid: 0, quote: "BTC", asset: "NPXS" },
  { exchange: "binance", name: "NPXSETH", ask: 0, bid: 0, quote: "ETH", asset: "NPXS" },
  { exchange: "binance", name: "OAXBTC", ask: 0, bid: 0, quote: "BTC", asset: "OAX" },
  { exchange: "binance", name: "ONEBNB", ask: 0, bid: 0, quote: "BNB", asset: "ONE" },
  { exchange: "binance", name: "ONEBTC", ask: 0, bid: 0, quote: "BTC", asset: "ONE" },
  { exchange: "binance", name: "ONTBTC", ask: 0, bid: 0, quote: "BTC", asset: "ONT" },
  { exchange: "binance", name: "PAXUSDT", ask: 0, bid: 0, quote: "USDT", asset: "PAX" },
  { exchange: "binance", name: "RENBNB", ask: 0, bid: 0, quote: "BNB", asset: "REN" },
  { exchange: "binance", name: "RENBTC", ask: 0, bid: 0, quote: "BTC", asset: "REN" },
  { exchange: "binance", name: "RVNBTC", ask: 0, bid: 0, quote: "BTC", asset: "RVN" },
  { exchange: "binance", name: "STORJBTC", ask: 0, bid: 0, quote: "BTC", asset: "STORJ" },
  { exchange: "binance", name: "THETABTC", ask: 0, bid: 0, quote: "BTC", asset: "THETA" },
  { exchange: "binance", name: "TRXBNB", ask: 0, bid: 0, quote: "BNB", asset: "TRX" },
  { exchange: "binance", name: "TRXBTC", ask: 0, bid: 0, quote: "BTC", asset: "TRX" },
  { exchange: "binance", name: "TRXETH", ask: 0, bid: 0, quote: "ETH", asset: "TRX" },
  { exchange: "binance", name: "TRXUSDT", ask: 0, bid: 0, quote: "USDT", asset: "TRX" },
  { exchange: "binance", name: "USDCUSDT", ask: 0, bid: 0, quote: "USDT", asset: "USDC" },
  { exchange: "binance", name: "VETBTC", ask: 0, bid: 0, quote: "BTC", asset: "VET" },
  { exchange: "binance", name: "WAVESBTC", ask: 0, bid: 0, quote: "BTC", asset: "WAVES" },
  { exchange: "binance", name: "WAVESETH", ask: 0, bid: 0, quote: "ETH", asset: "WAVES" },
  { exchange: "binance", name: "WTCBTC", ask: 0, bid: 0, quote: "BTC", asset: "WTC" },
  { exchange: "binance", name: "XLMBTC", ask: 0, bid: 0, quote: "BTC", asset: "XLM" },
  { exchange: "binance", name: "XMRBTC", ask: 0, bid: 0, quote: "BTC", asset: "XMR" },
  { exchange: "binance", name: "XRPBNB", ask: 0, bid: 0, quote: "BNB", asset: "XRP" },
  { exchange: "binance", name: "XRPBTC", ask: 0, bid: 0, quote: "BTC", asset: "XRP" },
  { exchange: "binance", name: "XRPETH", ask: 0, bid: 0, quote: "ETH", asset: "XRP" },
  { exchange: "binance", name: "XRPUSDT", ask: 0, bid: 0, quote: "USDT", asset: "XRP" },
  { exchange: "binance", name: "ZECBTC", ask: 0, bid: 0, quote: "BTC", asset: "ZEC" },
  { exchange: "kucoin", name: "ACAT-BTC", ask: 0, bid: 0, quote: "BTC", asset: "ACAT" },
  { exchange: "kucoin", name: "AERGO-BTC", ask: 0, bid: 0, quote: "BTC", asset: "AERGO" },
  { exchange: "kucoin", name: "AERGO-ETH", ask: 0, bid: 0, quote: "ETH", asset: "AERGO" },
  { exchange: "kucoin", name: "ALGO-BTC", ask: 0, bid: 0, quote: "BTC", asset: "ALGO" },
  { exchange: "kucoin", name: "BCHABC-BTC", ask: 0, bid: 0, quote: "BTC", asset: "BCHABC" },
  { exchange: "kucoin", name: "BCHABC-ETH", ask: 0, bid: 0, quote: "ETH", asset: "BCHABC" },
  { exchange: "kucoin", name: "BCHABC-USDT", ask: 0, bid: 0, quote: "USDT", asset: "BCHABC" },
  { exchange: "kucoin", name: "BNB-BTC", ask: 0, bid: 0, quote: "BTC", asset: "BNB" },
  { exchange: "kucoin", name: "BCHSV-BTC", ask: 0, bid: 0, quote: "BTC", asset: "BCHSV" },
  { exchange: "kucoin", name: "BCHSV-ETH", ask: 0, bid: 0, quote: "ETH", asset: "BCHSV" },
  { exchange: "kucoin", name: "BCHSV-USDT", ask: 0, bid: 0, quote: "USDT", asset: "BCHSV" },
  { exchange: "kucoin", name: "BTC-USDT", ask: 0, bid: 0, quote: "USDT", asset: "BTC" },
  { exchange: "kucoin", name: "BTT-BTC", ask: 0, bid: 0, quote: "BTC", asset: "BTT" },
  { exchange: "kucoin", name: "CAG-BTC", ask: 0, bid: 0, quote: "BTC", asset: "CAG" },
  { exchange: "kucoin", name: "CHR-BTC", ask: 0, bid: 0, quote: "BTC", asset: "CHR" },
  { exchange: "kucoin", name: "COTI-BTC", ask: 0, bid: 0, quote: "BTC", asset: "COTI" },
  { exchange: "kucoin", name: "CRPT-BTC", ask: 0, bid: 0, quote: "BTC", asset: "CRPT" },
  { exchange: "kucoin", name: "DAPPT-BTC", ask: 0, bid: 0, quote: "BTC", asset: "DAPPT" },
  { exchange: "kucoin", name: "DBC-BTC", ask: 0, bid: 0, quote: "BTC", asset: "DBC" },
  { exchange: "kucoin", name: "DOCK-BTC", ask: 0, bid: 0, quote: "BTC", asset: "DOCK" },
  { exchange: "kucoin", name: "DRGN-BTC", ask: 0, bid: 0, quote: "BTC", asset: "DRGN" },
  { exchange: "kucoin", name: "EOS-BTC", ask: 0, bid: 0, quote: "BTC", asset: "EOS" },
  { exchange: "kucoin", name: "EOS-ETH", ask: 0, bid: 0, quote: "ETH", asset: "EOS" },
  { exchange: "kucoin", name: "EOS-USDT", ask: 0, bid: 0, quote: "USDT", asset: "EOS" },
  { exchange: "kucoin", name: "ETH-BTC", ask: 0, bid: 0, quote: "BTC", asset: "ETH" },
  { exchange: "kucoin", name: "ETH-USDT", ask: 0, bid: 0, quote: "USDT", asset: "ETH" },
  { exchange: "kucoin", name: "ETN-BTC", ask: 0, bid: 0, quote: "BTC", asset: "ETN" },
  { exchange: "kucoin", name: "EXY-BTC", ask: 0, bid: 0, quote: "BTC", asset: "EXY" },
  { exchange: "kucoin", name: "FORESTPLUS-BTC", ask: 0, bid: 0, quote: "BTC", asset: "FORESTPLUS" },
  { exchange: "kucoin", name: "FTM-BTC", ask: 0, bid: 0, quote: "BTC", asset: "FTM" },
  { exchange: "kucoin", name: "FTM-ETH", ask: 0, bid: 0, quote: "ETH", asset: "FTM" },
  { exchange: "kucoin", name: "FX-BTC", ask: 0, bid: 0, quote: "BTC", asset: "FX" },
  { exchange: "kucoin", name: "GRIN-BTC", ask: 0, bid: 0, quote: "BTC", asset: "GRIN" },
  { exchange: "kucoin", name: "HKN-BTC", ask: 0, bid: 0, quote: "BTC", asset: "HKN" },
  { exchange: "kucoin", name: "HPB-BTC", ask: 0, bid: 0, quote: "BTC", asset: "HPB" },
  { exchange: "kucoin", name: "J8T-BTC", ask: 0, bid: 0, quote: "BTC", asset: "J8T" },

  { exchange: "kucoin", name: "KCS-BTC", ask: 0, bid: 0, quote: "BTC", asset: "KCS" },
  { exchange: "kucoin", name: "KCS-ETH", ask: 0, bid: 0, quote: "ETH", asset: "KCS" },
  { exchange: "kucoin", name: "KCS-USDT", ask: 0, bid: 0, quote: "USDT", asset: "KCS" },
  { exchange: "kucoin", name: "KICK-BTC", ask: 0, bid: 0, quote: "BTC", asset: "KICK" },
  { exchange: "kucoin", name: "LTC-BTC", ask: 0, bid: 0, quote: "BTC", asset: "LTC" },
  { exchange: "kucoin", name: "LTC-ETH", ask: 0, bid: 0, quote: "ETH", asset: "LTC" },
  { exchange: "kucoin", name: "LTC-USDT", ask: 0, bid: 0, quote: "USDT", asset: "LTC" },
  { exchange: "kucoin", name: "NANO-BTC", ask: 0, bid: 0, quote: "BTC", asset: "NANO" },
  { exchange: "kucoin", name: "NEO-BTC", ask: 0, bid: 0, quote: "BTC", asset: "NEO" },
  { exchange: "kucoin", name: "NEO-ETH", ask: 0, bid: 0, quote: "ETH", asset: "NEO" },
  { exchange: "kucoin", name: "NOIA-BTC", ask: 0, bid: 0, quote: "BTC", asset: "NOIA" },
  { exchange: "kucoin", name: "NRG-BTC", ask: 0, bid: 0, quote: "BTC", asset: "NRG" },
  { exchange: "kucoin", name: "OLT-BTC", ask: 0, bid: 0, quote: "BTC", asset: "OLT" },
  { exchange: "kucoin", name: "R-BTC", ask: 0, bid: 0, quote: "BTC", asset: "R" },
  { exchange: "kucoin", name: "RIF-BTC", ask: 0, bid: 0, quote: "BTC", asset: "RIF" },
  { exchange: "kucoin", name: "TEL-BTC", ask: 0, bid: 0, quote: "BTC", asset: "TEL" },
  { exchange: "kucoin", name: "TOMO-BTC", ask: 0, bid: 0, quote: "BTC", asset: "TOMO" },
  { exchange: "kucoin", name: "TRX-BTC", ask: 0, bid: 0, quote: "BTC", asset: "TRX" },
  { exchange: "kucoin", name: "TRX-ETH", ask: 0, bid: 0, quote: "ETH", asset: "TRX" },
  { exchange: "kucoin", name: "TRX-USDT", ask: 0, bid: 0, quote: "USDT", asset: "TRX" },
  { exchange: "kucoin", name: "TRY-BTC", ask: 0, bid: 0, quote: "BTC", asset: "TRY" },
  { exchange: "kucoin", name: "VNX-BTC", ask: 0, bid: 0, quote: "BTC", asset: "VNX" },
  { exchange: "kucoin", name: "VSYS-BTC", ask: 0, bid: 0, quote: "BTC", asset: "VSYS" },
  { exchange: "kucoin", name: "WAN-BTC", ask: 0, bid: 0, quote: "BTC", asset: "WAN" },
  { exchange: "kucoin", name: "WGP-BTC", ask: 0, bid: 0, quote: "BTC", asset: "WGP" },
  { exchange: "kucoin", name: "WXT-BTC", ask: 0, bid: 0, quote: "BTC", asset: "WXT" },
  { exchange: "kucoin", name: "XRP-BTC", ask: 0, bid: 0, quote: "BTC", asset: "XRP" },
  { exchange: "kucoin", name: "XRP-ETH", ask: 0, bid: 0, quote: "ETH", asset: "XRP" },
  { exchange: "kucoin", name: "XRP-USDT", ask: 0, bid: 0, quote: "USDT", asset: "XRP" }
]

const Arbitrage = new ARBITRAGEAPI(symbols)

Arbitrage.start()

console.time("Arbitrage calc loop")

for (let i = 0; i < 100; i++) {
  Arbitrage.create_combinations()

  Arbitrage.evaluate_combinations()
}

console.timeEnd("Arbitrage calc loop")

console.log(Arbitrage.combinations)