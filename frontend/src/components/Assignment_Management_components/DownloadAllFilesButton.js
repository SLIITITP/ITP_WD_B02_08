import axios from 'axios';

export default function DownloadAllFilesButton() {


  const handleDownloadAllFiles = async () => {
    
    try {
      const response = await axios.get('http://localhost:9090/items/downloadAllFiles', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'all-files.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleDownloadAllFiles}>Download All Files</button>
  );
}
