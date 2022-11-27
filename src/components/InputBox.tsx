export interface InputBoxProps<T> {
    path: string[]
    value: T
    onChange: (path: string[], s: T) => void
}

export const InputBox = <T extends string | boolean | number>({ path, value, onChange }: InputBoxProps<T>) => {
    switch (typeof value) {
        case 'number':
            return (
                <input
                    type="number"
                    value={value}
                    onChange={(v) => {
                        //数字以外の入力を受け付けない
                        if (v.target.value) {
                            const tmp = parseFloat(v.target.value)
                            if (!isNaN(tmp)) onChange(path, tmp as T)
                        }
                    }}
                />
            )
        case 'boolean':
            return (
                <input
                    id="default-checkbox"
                    type="checkbox"
                    checked={value}
                    onChange={(_) => onChange(path, !value as T)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
            )
        default:
            return <input type="text" value={value} onChange={(v) => onChange(path, v.target.value as T)} />
        // default:
        //     return <div>No renderer</div>
    }
}
