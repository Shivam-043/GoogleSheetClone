import React from 'react';
import {View, Button} from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

const Navbar = ({onDownload}) => {
  const handleDownload = async () => {
    // Convert gridData to an Excel workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(onDownload);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    console.log('Hello');
    // Write the workbook to a file
    const excelData = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'base64',
    });

    console.log(excelData);
    const filePath = `${RNFS.DownloadDirectoryPath}/example.xlsx`;

    try {
      await RNFS.writeFile(filePath, excelData, 'base64');
      alert('File downloaded successfully!');
    } catch (error) {
      console.error('Error downloading file: ', error);
      alert('Error downloading the file.');
    }
  };

  // const convertArrayToExcel = (array, fileName) => {
  //   const ws = XLSX.utils.aoa_to_sheet(array);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   // const filename = "data.xlsx";
  //   const filepath = RNFS.DocumentDirectoryPath + "/" + fileName;

  //   RNFS.writeFile(filepath, XLSX.write(wb, { type: "xlsx" })).then(() => {
  //     console.log("File saved!");
  //   });
  // };

  // const handleConvertToExcel = () => {
  //   convertArrayToExcel(onDownload, "example.xlsx");
  // };
  return <View>{<Button title="Download" onPress={handleDownload} />}</View>;
};

export default Navbar;
