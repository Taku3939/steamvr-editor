import './App.css'
import SettingViewer from './view/SettingViewer'
import { useState } from 'react'

function App() {
    const [defaultPath, setDefaultPath] = useState('F:\\')
    return (
        <div>
            パスの設定
            <input type="text" value={defaultPath} onChange={(v) => setDefaultPath(v.target.value as string)} />
            <SettingViewer path={defaultPath + 'default.vrsettings'} />
        </div>
    )
}

export default App
