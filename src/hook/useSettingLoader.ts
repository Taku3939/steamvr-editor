import { invoke } from '@tauri-apps/api/tauri'
import { useState } from 'react'

export const useSettingLoader = (path: string) => {
    const [settings, setSettings] = useState<any>()

    const write = async (arr: any) => await invoke('write', { path, txt: JSON.stringify(arr, null, 2) })

    const load = async () =>
        await invoke<string>('load', { path })
            .then((res) => {
                try {
                    const parseTxt = JSON.parse(res)
                    setSettings(parseTxt)
                } catch (err) {}
            })
            .catch((_) => {})

    async function setValue(path: string[], value: any) {
        if (settings !== undefined) {
            const arr = { ...settings }
            const tmpArr = [arr[path[0]]]
            for (let i = 1; i < path.length; i++) {
                let tmp = tmpArr[i - 1][path[i]]
                if (i == path.length - 1) tmp = value
                tmpArr[i] = tmp
            }
            for (let i = path.length - 1; i >= 1; i--) tmpArr[i - 1][path[i]] = tmpArr[i]

            await write(arr)
            await load()
        }
    }

    return { settings, setSettings: setValue, load }
}
