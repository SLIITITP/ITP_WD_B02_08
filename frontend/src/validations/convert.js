//convert image to base64 format
export default function covertToBase64(file){
    return new Promise ((resolve,reject) =>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        FileReader.onerror = (error) =>{
            reject (error)
        }
    })
}