const fs = require('fs');
const path = require('path');

/**
 * 讀取資料夾所有檔名
 * @param {string} folderPath - 資料夾絕對路徑
 * @returns {string[]} 檔名字串陣列
 */
function getFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);

    return files/* .filter(file => {
      // 排除子資料夾，只回傳檔案
      const fullPath = path.join(folderPath, file);
      return fs.statSync(fullPath).isFile();
    }); */

  } catch (err) {
    console.error("讀取資料夾錯誤：", err);
    return [];
  }
}
function saveJSONToFile(filePath, jsonData) {
  try {
    const folder = path.dirname(filePath);

    // 若資料夾不存在則建立
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    // 轉為格式化字串
    const jsonString = JSON.stringify(jsonData);

    // 寫入檔案
    fs.writeFileSync(filePath, jsonString, "utf8");
    console.log("JSON 已成功寫入:", filePath);

  } catch (err) {
    console.error("寫入 JSON 檔案失敗:", err);
  }
}

// 使用示例
const result = getFiles("D:\\font-awesome-6-pro\\svgs").filter(dir => dir !== "brands");
const files = result.flatMap(file => getFiles("D:\\font-awesome-6-pro\\svgs\\"+file))
const uniqueFiles = files.filter((el, i, arr) => arr.indexOf(el) === i).map(file=>file.replace(/\.svg/,'')).sort()
saveJSONToFile("D:/font-awesome-6-pro/svgName.json", uniqueFiles);
