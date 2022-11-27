import './App.css'
import { useSettingLoader } from './hook/useSettingLoader'
import { InputBox } from './components/InputBox'

function App() {
    const { settings, set, isLoading, load } = useSettingLoader()

    if (isLoading) {
        return <div>Loading...</div>
    }

    function onLoad(json: any, path: string[]) {
        return Object.entries(json).map(([key, value]) => {
            return (
                <ul>
                    <li>
                        {key}
                        <ul>
                            {typeof value === 'object' ? (
                                onLoad(value as any, [...path, key])
                            ) : (
                                <InputBox path={[...path, key]} value={value as any} onChange={set} />
                            )}
                        </ul>
                    </li>
                </ul>
            )
        })
    }
    return (
        <div>
            ヘッドセット
            <button onClick={async () => await load()}>load</button>
            <table>{onLoad(settings, [])}</table>
        </div>
    )
}

export default App
