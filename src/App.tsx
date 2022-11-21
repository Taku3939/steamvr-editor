import { useState } from 'react'
import './App.css'
import { useSettingLoader } from './hook/useSettingLoader'

function App() {
    const [isOn, setIsOn] = useState(false)
    const { settings, load } = useSettingLoader()
    return (
        <div>
            ヘッドセット
            <button onClick={async () => await load()}>load</button>
            <div>{settings}</div>
        </div>
    )
}

export default App
