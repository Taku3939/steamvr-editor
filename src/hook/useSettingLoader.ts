import { invoke } from '@tauri-apps/api/tauri'
import { useState } from 'react'

export const useSettingLoader = () => {
    const [settings, setSettings] = useState<string>()

    async function Load(): Promise<string> {
        const txt: string = await invoke('load')
        return txt
    }

    const load = async () => {
        const loadstr = await Load()
        setSettings(loadstr)
    }

    return { settings, load }
}
