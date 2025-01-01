export const aggregateYearlyProduction = (data: any[]) => {
  const result: { year: string; maxCrop: string; minCrop: string }[] = [];
  
  // Group data by year
  const groupedByYear = data.reduce((acc: any, item) => {
    const year = item.Year.split(", ")[1];
    acc[year] = acc[year] || [];
    acc[year].push(item);
    return acc;
  }, {});

  for (const year in groupedByYear) {
    const crops = groupedByYear[year];
    
    // Find crop with maximum production
    const maxCrop = crops.reduce(
      (max, crop) => 
        parseFloat(crop["Crop Production (UOM:t(Tonnes))"] || "0") > 
        parseFloat(max["Crop Production (UOM:t(Tonnes))"] || "0")
          ? crop 
          : max,
      crops[0]
    );

    // Find crop with minimum production
    const minCrop = crops.reduce(
      (min, crop) => 
        parseFloat(crop["Crop Production (UOM:t(Tonnes))"] || "0") < 
        parseFloat(min["Crop Production (UOM:t(Tonnes))"] || "0")
          ? crop 
          : min,
      crops[0]
    );

    result.push({
      year,
      maxCrop: maxCrop["Crop Name"] || "N/A",
      minCrop: minCrop["Crop Name"] || "N/A",
    });
  }

  return result;
};

export const aggregateCropData = (data: any[]) => {
  // Group data by crop
  const groupedByCrop = data.reduce((acc: any, item) => {
    const crop = item["Crop Name"];
    acc[crop] = acc[crop] || { yield: 0, area: 0, count: 0 };

    // Add values, treating missing as 0
    acc[crop].yield += parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || "0");
    acc[crop].area += parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"] || "0");
    acc[crop].count++;

    return acc;
  }, {});

  return Object.entries(groupedByCrop).map(([crop, values]: any) => ({
    crop,
    avgYield: (values.yield / values.count).toFixed(3),
    avgArea: (values.area / values.count).toFixed(3),
  }));
};
