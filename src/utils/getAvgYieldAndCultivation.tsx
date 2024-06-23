import { agriData } from "./data.tsx";

interface CropData {
  'Crop Name': any;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': number;
  'Area Under Cultivation (UOM:Ha(Hectares))': number;
}

interface CropStatistics {
  CropName: string;
  AverageYield: string;
  AverageCultivationArea: string;
}

export const getAvgYieldAndCultivation = (): CropStatistics[] => {
    // Group data by crop
    const groupedByCrop: { [key: string]: CropData[] } = agriData.reduce((acc:any, curr) => {
      if (!acc[curr['Crop Name']]) {
        acc[curr['Crop Name']] = [];
      }
      acc[curr['Crop Name']].push(curr);
      return acc;
    },{});
  
    // Calculate average yield and average cultivation area for each crop
    const cropStatistics: CropStatistics[] = Object.keys(groupedByCrop).map(cropName => {
      const cropData = groupedByCrop[cropName];
      const yieldSum = cropData.reduce((sum, item) => sum + (item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || 0), 0);
      const areaSum = cropData.reduce((sum, item) => sum + (item['Area Under Cultivation (UOM:Ha(Hectares))'] || 0), 0);
      const totalYears = cropData.length;
  
      return {
        CropName: cropName,
        AverageYield: (yieldSum / totalYears).toFixed(3),
        AverageCultivationArea: (areaSum / totalYears).toFixed(3)
      };
    });
  
    return cropStatistics;
}