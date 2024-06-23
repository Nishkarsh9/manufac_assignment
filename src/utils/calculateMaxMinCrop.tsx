import { agriData } from "./data"


interface CropData {
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number;
}

interface MaxMinCrop {
    Year: string;
    CropWithMaxProduction: string;
    CropWithMinProduction: string;
}

export const calculateMaxMinCrop = (): MaxMinCrop[] => {
    const data: any  = agriData;

    // Group data by year
    const groupedByYear: { [year: string]: CropData[] } = data.reduce((acc:any, curr:any) => {
        // Extract the year from the "Year" field
        const year = curr.Year.split(',').pop().trim();

        if (!acc[year]) {
            acc[year] = [];
        }

        acc[year].push(curr);
        return acc;
    }, {});
    
    // Calculate max and min crop for each year
    const maxMinCrops: MaxMinCrop[] = Object.keys(groupedByYear).map(year => {
        const yearData = groupedByYear[year];
        const maxCrop = yearData.reduce((prev, curr) => {
            return (
                prev['Crop Production (UOM:t(Tonnes))'] || 0) > (curr['Crop Production (UOM:t(Tonnes))'] || 0) ? prev : curr;
        });
        const minCrop = yearData.reduce((prev, curr) => {
            return (prev['Crop Production (UOM:t(Tonnes))'] || Infinity) < (curr['Crop Production (UOM:t(Tonnes))'] || Infinity) ? prev : curr;
        });
        return {
            Year: year,
            CropWithMaxProduction: maxCrop['Crop Name'],
            CropWithMinProduction: minCrop['Crop Name'],
        };
    });
    
    return maxMinCrops;
}