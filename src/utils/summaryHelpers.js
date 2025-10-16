import { insurancePricingData } from "../comppnents/Registration/insurancePricingData";


// Helper function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

// Function to merge surname and other names from formData and capitalize each first word
export const getFullName = (formData) => {
  const { surname, other_names } = formData.personalData;
  return capitalizeWords(`${surname} ${other_names}`);
};

// Function to generate a random reference number
export const generateReference = () => {
  const reference = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
  return reference;
};

// Utility function to parse date from dd/mm/yyyy format
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(`${year}-${month}-${day}`);
};

// Function to calculate age from date of birth
export const calculateAge = (formData) => {
  const { dob } = formData.personalData;

  try {
    const birthDate = parseDate(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  } catch (error) {
    console.error('Invalid date of birth:', error);
    return null;
  }
};

// Function to generateEmail
export const generateEmail = (formData) => {
  return formData.loginDetails.email;
};

// Function to get the cover destination
export const getCoverDestination = (formData) => {
  return formData.coverDestination.destination;
};

// Function to find the zone based on destination
export const getArea = (formData, countryZones) => {
  const destination = formData.coverDestination.destination;

  if (
    countryZones.zone1.europe.includes(destination) ||
    countryZones.zone1.africa.includes(destination) ||
    countryZones.zone1.middleEast.includes(destination)
  ) {
    return "zone1";
  }

  if (
    countryZones.zone2.allOthers.includes(destination) // Adjusted for zone2
  ) {
    return "zone2";
  }

  return "zone3";
};

// Function to get the nationality
export const getNationality = (formData) => {
  return formData.personalData.nationality;
};

// Function to get the period between start and end date
export const getPeriod = (formData) => {
  const { startDate, endDate } = formData.coverDestination;
  return `${startDate} - ${endDate}`;
};

// Function to calculate duration in days
export const calculateDuration = (formData) => {
  const { startDate, endDate } = formData.coverDestination;
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayDiff === 1 ? "1 day" : `${dayDiff} days`;
};

// Function to calculate premium
export const calculatePremium = (formData, countryZones) => {
  const area = getArea(formData, countryZones);
  const dayDiff = parseInt(calculateDuration(formData).split(" ")[0], 10);
  const age = calculateAge(formData);

  const pricingData = insurancePricingData[area]?.ranges;

  if (!pricingData) {
    console.error('No pricing data available for the area:', area);
    return "Pricing not available";
  }

  let selectedPrice = null;

  for (const range of pricingData) {
    if (dayDiff >= range.days.min && dayDiff <= range.days.max) {
      selectedPrice = age <= 60 ? range.prices.standard.price : range.prices.senior.price;
      break;
    }
  }

  return selectedPrice ? `NGN ${selectedPrice.toLocaleString()}.00` : "Pricing not found for the selected duration.";
};

// Function to calculate premium amount as a proper number
export const premiumAmount = (formData, countryZones) => {
  const area = getArea(formData, countryZones);
  const dayDiff = parseInt(calculateDuration(formData).split(" ")[0], 10);
  const age = calculateAge(formData);

  const pricingData = insurancePricingData[area]?.ranges;

  if (!pricingData) {
    console.error('No pricing data available for the area:', area);
    return null; // Return null if no pricing data available
  }

  let selectedPrice = null;

  for (const range of pricingData) {
    if (dayDiff >= range.days.min && dayDiff <= range.days.max) {
      selectedPrice = age <= 60 ? range.prices.standard.price : range.prices.senior.price;
      break;
    }
  }

  return selectedPrice ? selectedPrice : null; // Return the selected price as a number
};



//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) {
//     throw new Error('Invalid date format');
//   }
  
//   // Format date to YYYY-MM-DD
//   const formattedDate = date.toISOString().split('T')[0];  // 'toISOString' returns date in ISO format, and 'split' removes the time part
//   return formattedDate;
// };




// Example usage function to store results in variables
export const useSummaryData = (formData, countryZones) => {
  const reference = generateReference();
  const name = getFullName(formData);
  const age = calculateAge(formData);
  const email = generateEmail(formData);
  const destination = getCoverDestination(formData);
  const area = getArea(formData, countryZones);
  const nationality = getNationality(formData);
  const period = getPeriod(formData);
  const duration = calculateDuration(formData);
  const premium = calculatePremium(formData, countryZones); // Include premium calculation

  return {
    reference,
    name,
    age,
    email,
    destination,
    area,
    nationality,
    period,
    duration,
    premium,
  };
};


