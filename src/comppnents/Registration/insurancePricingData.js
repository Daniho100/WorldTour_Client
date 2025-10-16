export const insurancePricingData = {
  zone1: {
    name: "SCHENGEN - EUROPE - MIDDLE EAST - AFRICA",
    ranges: [
      {
        days: { min: 1, max: 7 },
        prices: {
          standard: { min: 0, max: 60, price: 4950 },
          senior: { min: 61, max: 70, price: 6600 }
        }
      },
      {
        days: { min: 8, max: 14 },
        prices: {
          standard: { min: 0, max: 60, price: 6105 },
          senior: { min: 61, max: 70, price: 11000 }
        }
      },
      {
        days: { min: 15, max: 30 },
        prices: {
          standard: { min: 0, max: 60, price: 9900 },
          senior: { min: 61, max: 70, price: 16500 }
        }
      },
      {
        days: { min: 31, max: 60 },
        prices: {
          standard: { min: 0, max: 60, price: 15620 },
          senior: { min: 61, max: 70, price: 22000 }
        }
      },
      {
        days: { min: 61, max: 90 },
        prices: {
          standard: { min: 0, max: 60, price: 23100 },
          senior: { min: 61, max: 70, price: 27500 }
        }
      },
      {
        days: { min: 91, max: 180 },
        prices: {
          standard: { min: 0, max: 60, price: 27500 },
          senior: { min: 61, max: 70, price: 40700 }
        }
      },
      {
        days: { min: 181, max: 365 },
        prices: {
          standard: { min: 0, max: 60, price: 38500 },
          senior: { min: 61, max: 70, price: 60500 }
        }
      }
    ]
  },
  zone2: {
    name: "All Other Countries",
    ranges: [
      {
        days: { min: 1, max: 7 },
        prices: {
          standard: { min: 0, max: 60, price: 8800 },
          senior: { min: 61, max: 70, price: 11000 }
        }
      },
      {
        days: { min: 8, max: 14 },
        prices: {
          standard: { min: 0, max: 60, price: 12100 },
          senior: { min: 61, max: 70, price: 16500 }
        }
      },
      {
        days: { min: 15, max: 30 },
        prices: {
          standard: { min: 0, max: 60, price: 16500 },
          senior: { min: 61, max: 70, price: 22000 }
        }
      },
      {
        days: { min: 31, max: 60 },
        prices: {
          standard: { min: 0, max: 60, price: 22550 },
          senior: { min: 61, max: 70, price: 33000 }
        }
      },
      {
        days: { min: 61, max: 90 },
        prices: {
          standard: { min: 0, max: 60, price: 33000 },
          senior: { min: 61, max: 70, price: 38500 }
        }
      },
      {
        days: { min: 91, max: 180 },
        prices: {
          standard: { min: 0, max: 60, price: 46750 },
          senior: { min: 61, max: 70, price: 49500 }
        }
      },
      {
        days: { min: 181, max: 365 },
        prices: {
          standard: { min: 0, max: 60, price: 75900 },
          senior: { min: 61, max: 70, price: 97900 }
        }
      }
    ]
  },
  zone3: {
    name: "Worldwide",
    ranges: [
      {
        days: { min: 1, max: 7 },
        prices: {
          standard: { min: 0, max: 60, price: 9680 },
          senior: { min: 61, max: 70, price: 12100 }
        }
      },
      {
        days: { min: 8, max: 14 },
        prices: {
          standard: { min: 0, max: 60, price: 13310 },
          senior: { min: 61, max: 70, price: 18150 }
        }
      },
      {
        days: { min: 15, max: 30 },
        prices: {
          standard: { min: 0, max: 60, price: 18150 },
          senior: { min: 61, max: 70, price: 24200 }
        }
      },
      {
        days: { min: 31, max: 60 },
        prices: {
          standard: { min: 0, max: 60, price: 24805 },
          senior: { min: 61, max: 70, price: 36300 }
        }
      },
      {
        days: { min: 61, max: 90 },
        prices: {
          standard: { min: 0, max: 60, price: 36300 },
          senior: { min: 61, max: 70, price: 42350 }
        }
      },
      {
        days: { min: 91, max: 180 },
        prices: {
          standard: { min: 0, max: 60, price: 51425 },
          senior: { min: 61, max: 70, price: 54450 }
        }
      },
      {
        days: { min: 181, max: 365 },
        prices: {
          standard: { min: 0, max: 60, price: 83490 },
          senior: { min: 61, max: 70, price: 107690 }
        }
      }
    ]
  }
};
