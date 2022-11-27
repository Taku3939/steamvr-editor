import { invoke } from '@tauri-apps/api/tauri'
import { useState } from 'react'

export const useSettingLoader = () => {
    const [settings, setSettings] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function Load(): Promise<any> {
        setIsLoading(true)
        const txt: string = await invoke('load')
        setIsLoading(false)

        return JSON.parse(txt)
    }

    const load = async () => {
        await Load()
            .then((res) => {
                setSettings(res)
            })
            .catch((_) => {})
    }

    function set2(state: any): { [x: string]: any } {
        return Object.entries(state).forEach(([key, value]) => {
            return { key, value }
        })
    }

    function set(path: string[], value: any) {
        setSettings((prevState: { [x: string]: any } | undefined) => {
            if (prevState !== undefined) {
                let data = prevState
                let output: { [x: string]: any } = {}
                while (Object.entries(prevState).length > 0) {
                    Object.entries(prevState).forEach(([key, value]) => {})
                }

                // const list = []
                // list.push(k)
                // let i = 0
                // for (; i < path.length - 1; i++) {
                //     k = k[path[i]]
                //     list.push(k)
                // }
                //
                // k[0] = value
                // for (i = path.length; i >= 0; i--) {}
                //
                // console.log(list)
                return prevState
            }
            return prevState
        })
    }

    return { settings, set, isLoading, load }
}
