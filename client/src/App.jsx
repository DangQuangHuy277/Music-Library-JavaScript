import { Route, Routes } from "react-router-dom"
import Albums from "./pages/Albums"
import Artists from "./pages/Artists"
import Home from "./pages/Home"
import Songs from "./pages/Songs"
import SongsFromOther from "./pages/SongsFromOther"


export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="albums/:id/songs" element={<SongsFromOther source='album' />} />
      <Route path="artists/:id/songs" element={<SongsFromOther source='artist' />} />
      <Route path="albums" element={<Albums />} />
      <Route path="artists" element={<Artists />} />
      <Route path="songs" element={<Songs />} />

    </Routes>
  )
}

