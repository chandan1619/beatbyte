import React, {useState} from 'react'

const Editor = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
      }
    };

  return (
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <form method="POST" action="action.php">
                        <div class="mb-4 gap-6">
                            <label for="fname"> <svg className="h-18 w-12 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>  
                            </label>
                            {selectedImage && <img src={selectedImage} alt="Preview" class="object-cover w-full  h-full mt-0" />}
                            <input type="file" id="fname" name="custId"  hidden  onChange={handleImageUpload} />
                            <label class="text-xl text-gray-600">Title <span class="text-red-500">*</span></label>
                            <input type="text" class="border-2 border-gray-300 p-2 w-full" name="title" id="title" value="" required />
                        </div>

                        <div class="mb-4">
                            <label class="text-xl text-gray-600">Description</label>
                            <input type="text" class="border-2 border-gray-300 p-2 w-full" name="description" id="description" placeholder="(Optional)" />
                        </div>

                        <div class="mb-8">
                            <label class="text-xl text-gray-600">Content <span class="text-red-500">*</span></label>
                            <textarea name="content" class="border-2 border-gray-500 w-full h-56">
                                
                            </textarea>
                        </div>

                        <div class="flex p-1">
                            <select class="border-2 border-gray-300 border-r p-2" name="action">
                                <option>Save and Publish</option>
                                <option>Save Draft</option>
                            </select>
                            <button role="submit" class="p-3 bg-blue-500 text-white hover:bg-blue-400" required>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Editor