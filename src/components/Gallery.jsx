import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const url = "https://agmiyqieenusefssdeck.supabase.co/storage/v1/object/public/images/";

const Gallery = ({ user, supabaseClient }) => {
  
  const [images, setImages] = useState([]);

  const getImages = async() => {
    const { data, error } = await supabaseClient.storage.from('images').list(`${user.id}`, {
      limit: 100,
      offset:0,
      sortBy:{column:'name',order:'asc'}
    });

    if (data) {
      setImages(data);
    }
    else {
      console.log(error);
    }
  }
 
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const { data, error } = await supabaseClient.storage.from('images').upload(`${user.id}/${uuidv4()}`, file);

    if (data) {
      getImages();
    }

    else {
      
    }
  }

  const deleteImage = async (imageName) => {
    
    const { data, error } = await supabaseClient.storage.from('images').remove([`${user.id}/${imageName}`]);

    if (data) {
      getImages();
    }
    else {
      
    }
  }

  useEffect(() => {

    if (user) {
      getImages();
    }
    
  }, [user]);


  return (
    <div>
      <div>
        <form className="flex items-center justify-center py-6 ">
          <button className="relative flex space-x-2 items-center py-2 px-6 rounded-md bg-blue-500 hover:bg-blue-400 w-max  text-white ">
            <span>Upload</span>
            <img src="./upload.svg" alt="upload" className='h-5 w-5'/>
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={(e)=>uploadImage(e)}/>
          </button>
         </form>
       </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
        {
          images.map((image,index) => {
            return (index !== 0) ?
              <div key={image.name} className='flex flex-col items-center space-y-4 border border-gray-300 rounded-md p-4 shadow-sm'>
                <img src={`${url}${user.id}/${image.name}`}  className="flex-grow"/>
                <button className=' flex space-x-2 items-center cursor-pointer py-2 px-6 rounded-md bg-red-500 hover:bg-red-400 w-max text-white ' onClick={() => deleteImage(image.name)}>
                  <span>Delete</span>  
                  <img src="./delete.svg" alt="delete" className='h-5 w-5'/>
                </button>
              </div>
              : null
           })  
        }
       </div>
    </div>
  )
}

export default Gallery;