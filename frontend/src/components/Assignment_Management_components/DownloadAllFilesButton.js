import axios from 'axios';



export default function DownloadAllFilesButton({ id }) {
  const handleDownloadAllFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/items/getAll/${id}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' || 'image/png'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleDownloadAllFiles}>Download File</button>
  );
}
