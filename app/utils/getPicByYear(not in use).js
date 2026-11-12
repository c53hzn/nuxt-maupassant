export default async (queryCollection, myYear ,error) => {
  const { data} = await useAsyncData('pic-gallery', () =>
    queryCollection('gallery').order('slug', 'DESC').all()
  )
  const picData = data.value;
  var myYear2 = myYear?String(myYear):picData[0].postTime.substring(0,4);
  function buildPicJSON(picData) {
    // 1) 按年 -> 月 归集 picURLs
    const yearMap = new Map();//map array，不是array
    picData.forEach(({ postTime, picIds }) => {
      if (!picIds || picIds.trim() === "") return;
      if (/\.gif/i.test(picIds)&&!/\.jpg/i.test(picIds)) return;
      const [year, month] = postTime.split("/");
      if (!yearMap.has(year)) yearMap.set(year, new Map());
      const monthMap = yearMap.get(year);
      if (!monthMap.has(month)) monthMap.set(month, []);
      monthMap.get(month).push(
        ...picIds.split(";")
        .filter(Boolean)
        .filter(id => !/\.gif$/i.test(id))
        .map(id => `pic/${id}`)
      );
    });

    // 2) 年份倒序、每年内月份倒序
    const years = [...yearMap.keys()].sort((a, b) => b.localeCompare(a));
    const data2 = {};
    const yearlyCount = [];

    years.forEach((year, i) => {
      const monthMap = yearMap.get(year);
      const months = [...monthMap.keys()].sort((a, b) => b.localeCompare(a));

      const monthly = months.map(month => ({
        year,
        month,
        picURLs: monthMap.get(month),
      }));

      data2[year] = monthly;
      yearlyCount.push({
        year,
        picCount: monthly.reduce((s, m) => s + m.picURLs.length, 0),
      });
    });

    // 3) 只要指定年份的，按月归集 picURLs
    const yearData = [...yearMap.get(myYear2)];//变成array

    return { yearData, yearlyCount };
  }

  const finalJSON = buildPicJSON(picData);

  return finalJSON
}