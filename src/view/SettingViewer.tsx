import { useSettingLoader } from '../hook/useSettingLoader'
import { InputBox } from '../components/InputBox'
import React, { useEffect } from 'react'

interface SettingViewerProps {
    path: string
}
const SettingViewer: React.FC<SettingViewerProps> = ({ path }) => {
    const { settings, setSettings, load } = useSettingLoader(path)
    useEffect(() => {
        if (!settings) load()
    }, [])

    function onLoad(json: any, path: string[]) {
        return Object.entries(json).map(([key, value]) => {
            return (
                <ul>
                    <li>
                        {key}
                        <ul>
                            {typeof value === 'object' && value !== null ? (
                                onLoad(value as any, [...path, key])
                            ) : (
                                <InputBox path={[...path, key]} value={value as any} onChange={setSettings} />
                            )}
                        </ul>
                    </li>
                </ul>
            )
        })
    }
    return <div>{settings && <table>{onLoad(settings, [])}</table>}</div>
}

export default SettingViewer
