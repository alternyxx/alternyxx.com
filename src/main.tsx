import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import './types'

import App from './App'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<App/>
		</StrictMode>
	</BrowserRouter>
);
