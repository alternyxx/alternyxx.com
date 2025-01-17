import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './pages/Home.tsx'

// Checks, GPU setup
// why not do this in an async component
let device: GPUDevice | undefined;
if (navigator.gpu) {
    const adapter = await navigator.gpu.requestAdapter();
	if (adapter) {
    	device = await adapter.requestDevice();
    }
}

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			{/* Path without entry... */}
			<Route index element={<Home device={device} stage={1} />} />

			{/* Path with entry... most people dont like it :c */}
			<Route path="entry" element={<Home device={device} stage={0} />}/>

			{/* A spinning blahaj */}
			<Route path="blahaj" element={<Home device={device} stage={2} hideHTML/>}/>
		</Routes>
	</BrowserRouter>
);
