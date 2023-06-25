import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AlbumBar from "../components/bar/AlbumBar";

import AddAlbumModal from "../components/modal/add/AddAlbumModal";

const baseURL = "http://localhost:8000/api";

function Albums() {
    const [isAdding, setIsAdding] = useState(false);
    const [albums, setAlbums] = useState([]);
    document.title = "Albums";

    useEffect(() => {
        let isMounted = true;
        async function fetchAlbums() {
            const response = await fetch(baseURL + '/albums', {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
            const data = await response.json();
            if (isMounted) setAlbums(data);
        }
        fetchAlbums();
        return () => { isMounted = false };
    }, [isAdding]);

    const handleDeleteAlbum = async (id) => {
        const res = await fetch(baseURL + `/albums/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        });
        if(!res.ok) {
            const message = await res.json();
            alert(message.message);
            return;
        }
        setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
    };

    const handleUpdateAlbum = async (id, title, releaseDate) => {
        const res = await fetch(baseURL + `/albums/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, releaseDate })
        });
        if(!res.ok) {
            const message = await res.json();
            alert(message.message);
            return;
        }
        setAlbums((prevAlbums) => prevAlbums.map((album) => {
            if (album.id === id) {
                return { ...album, title, releaseDate };
            }
            return album;
        }));
    };

    const handleAdd = async () => {
        setIsAdding(true);
    };

    const handleCloseModal = () => {
        setIsAdding(false);
    };

    const handleSaveModal = async () => {
        setIsAdding(false);
    }

    return (
        <div className="flex justify-between">
            <Sidebar />
            <div className="p-4 w-full">
                <h1 className="text-3xl font-bold mb-4 text-center">Albums</h1>
                <button className="float-right me-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={handleAdd}>
                    Add New Album
                </button>
                <AddAlbumModal open={isAdding} onClose={handleCloseModal} onSave={handleSaveModal} />
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-1/12">#</th>
                            <th className="w-3/12">Title</th>
                            <th className="w-3/12">Artist</th>
                            <th className="w-3/12">Release Date</th>
                            <th className="w-1/12"></th>
                            <th className="w-1/12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums.map((album, index) => (
                            //console.log(album),
                            <AlbumBar
                                key={album.id}
                                id={album.id}
                                number={index + 1}
                                title={album.title}
                                artist={album.Artist.name}
                                releaseDate={album.releaseDate}
                                onUpdate={handleUpdateAlbum}
                                onDelete={() => handleDeleteAlbum(album.id)}
                            />
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Albums;