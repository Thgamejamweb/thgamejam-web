/*
 * @Description: 
 * @Author: github.com/zhiguai
 * @Date: 2023-06-25 00:31:07
 * @LastEditTime: 2023-06-25 00:53:02
 * @LastEditors: github.com/zhiguai
 */
import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import '../../App.css'

function CCC() {
    const [count, setCount] = useState(0)
    console.log('3422432');
    
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/CCC.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default CCC
