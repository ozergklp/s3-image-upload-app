import './style.css'
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

async function postImage({ image, description }: { image: File, description: string }): Promise<{ image: string }> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    const result = await axios.post('http://localhost:4000/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
}

const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');
    

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            const result = await postImage({ image: file, description });
            console.log(result)
        }
    };

    const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    return (
        <div>
        <form onSubmit={submit} className="mb-4">
            <input onChange={fileSelected} type="file" accept="image/*" className="mr-2"></input>
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="mr-2 p-2 border border-gray-400 rounded"
                placeholder="Enter description"
            ></input>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Submit
            </button>
        </form>

        </div>
    );
};

export default App;

